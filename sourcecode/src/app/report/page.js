"use client";
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import Link from "next/link";
import app from "../../../firebaseconfig";
import {saveAs} from 'file-saver'
import { Typography } from "@mui/material";
import { PieChart } from "../components/chart";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import getHistory from "@/Services/gethistory";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase Storage functions
import { getGeminiReportService } from "@/Services/geminiReport";
import Table from '@mui/material/Table';
import DownloadIcon from '@mui/icons-material/Download';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import setURLS from "@/Services/setUrl";
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(Name, CreatedOn, Download) {
  return { Name, CreatedOn, Download};
}

 export default function GetReport() {
  const router = useRouter();
  const [urlList, setURL] = React.useState([])
  const [username,setusername] = React.useState("")
  const [reportData, setReportData] = useState({ positiveDays: 10, negativeDays: 5 });
  useEffect(() => {
    const fetchURLs = async () => {
      const userDetails = await JSON.parse(sessionStorage.getItem("user")) || null;
      if (userDetails && userDetails.urls) {
        setURL(userDetails.urls);
        setusername(userDetails.name)
      }
    };
    fetchURLs();
  }, []);

  const addURL = async(url, date)=>{

    const userDetails =  await JSON.parse(sessionStorage.getItem("user")) ||null
    const tempList = await userDetails.urls
    setURL(tempList)
    const newList = [...urlList, { url, date }];
    setURL(newList);
    userDetails.urls = newList;
    sessionStorage.setItem("user", JSON.stringify(userDetails));
    // await setURL(userDetails)
    await setURLS(userDetails)
    console.log("list ", urlList)
  }
  const handleDownload = async(url,name)=>{

  }
  const handleBack = async()=>{
    router.push("/chat")
  }
  const rows = urlList.map((item,index)=> createData(<Link className="cursor-pointer"  href={item.url} target="_blank"> <PictureAsPdfIcon/> {username} Report {index+1}</Link>,item.date, <DownloadIcon key={index} onClick={() => handleDownload(item.url,`${username} Report ${index+1}`)}/>))
    const handleGetReport = async() =>{
 
        console.log("report here")
        window.alert("report")
        const doc = new jsPDF()
        
        const storedUser =  JSON.parse(localStorage.getItem("user"))

        const history = await getHistory(storedUser)

        const response = await getGeminiReportService(history)

        doc.setFontSize(10)
        const pageHeight = doc.internal.pageSize.getHeight()
        const pageWidth = doc.internal.pageSize.getWidth()
        const maxWidth = pageWidth - 20
        const lines = doc.splitTextToSize(response,maxWidth)
        let y = 10
        const lineHeight = 10
        for(let i = 0 ; i < lines.length; i++){
          if(y + lineHeight > pageHeight - 10){
            doc.addPage()
            y=10
          }
          doc.text(lines[i],10,y)
          y+=lineHeight
        }
        const pdfBlob =  doc.output('blob'); // Convert PDF to Blob

        // Firebase Storage integration
        const storage = getStorage(app); // Get Firebase Storage instance
        const storageRef = ref(storage, `${storedUser.email}/${new Date().toDateString()}.pdf`);
        try {
          await uploadBytes(storageRef, pdfBlob); // Upload the PDF Blob
          // console.log("Report uploaded successfully!");
          const downloadURL = await getDownloadURL(storageRef)
          // console.log("download url",downloadURL)
          await addURL(downloadURL,new Date().toDateString())
          // setIsLoading(false); // Reset loading state
        } catch (error) {
          console.error("Error uploading report:", error);
          // setIsLoading(false); // Reset loading state on error
        }
  
    }
  return (
    <div className="main overflow-y-scroll">
      <ArrowBackIcon onClick={()=>handleBack()}/>
      
            <div className="m-4">
      <Typography variant="h4">Analysis</Typography>
      <hr className="border border-2"/>
      <PieChart data={reportData}/>
      {/* adding pie chart for number of positive and negative days */}
      {/*  */}
      <Typography variant="h4">Reports</Typography>
      <hr className="border border-2 mb-4"/>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>File Name</StyledTableCell>
            <StyledTableCell align="right">Date Created</StyledTableCell>
            <StyledTableCell align="right">Download</StyledTableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.Name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.CreatedOn}</StyledTableCell>
              <StyledTableCell align="right">{row.Download}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      
      <button className="border p-2 rounded-md border-black mt-4" onClick={()=>handleGetReport()}>Get Report</button>
    </div>
    </div>
  );
}
