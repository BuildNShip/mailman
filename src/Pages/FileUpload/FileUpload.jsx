//React code to upload a file to the server from the user's computer
import React from "react"
import styles from "./FileUpload.module.css"
import axios from "axios"
import { useState, useEffect } from "react"
import Papa from "papaparse"
import { useToast } from "@chakra-ui/react"

const FileUpload = () => {
  const [fromMail, setFromMail] = useState("")
  const [password, setPassword] = useState("")
  const [emailContent, setEmailContent] = useState("")
  const [subject, setSubject] = useState("")
  const [files, setFiles] = useState([])
  const [file, setFile] = useState()

  const [csvData, setCsvData] = useState([])

  const handleCsvUpload = (event) => {
    const file = event.target.files[0]
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        setCsvData(result.data)
      },
    })
  }

  const getDataByHeader = (header) => {
    return csvData.map((row) => row[header])
  }

  const handleSubmit = (e) => {
    console.log(csvData)
  }

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files)
    setFiles(selectedFiles)
  }

  const toast = useToast()

  return (
    <div className={styles.background_container}>
      <div className={styles.main_container}>
        <div className={styles.navbar}>
          <div className={styles.logo}>
            <p>MAiL - MAN</p>
          </div>
          <iframe
            src="https://ghbtns.com/github-btn.html?user=BuildNShip&repo=mailman-frontend&type=star&count=true&size=large"
            width="170"
            height="30"
            title="GitHub"
          ></iframe>
        </div>
        <div className={styles.top_header}>
          <div className={styles.creds}>
            <input
              onChange={(event) => {
                setFromMail(event.target.value)
              }}
              type="email"
              value={fromMail}
              required
              placeholder="From Address"
            />
            <input
              onChange={(event) => {
                setPassword(event.target.value)
              }}
              value={password}
              type="password"
              required
              placeholder="Email Password"
            />
            <button
              onClick={() => {
                //check whether the email and password are valid or not and there is a mail subject and content and the state variables are not empty

                handleSubmit()
              }}
              className={styles.sent_mail}
            >
              Sent Mails
            </button>
          </div>
          <div className={styles.subject_row}>
            <input
              onChange={(event) => {
                setSubject(event.target.value)
              }}
              type="text"
              value={subject}
              required
              placeholder="Mail Subject"
            />
          </div>
        </div>
        <div className={styles.mail_body}>
          <textarea
            className={styles.mail_content}
            onChange={(event) => {
              setEmailContent(event.target.value)
            }}
            value={emailContent}
            placeholder="Mail Content"
            required
          />
          <div className={styles.attachments}>
            <input
              type="file"
              id="file1"
              name="file1"
              onChange={(e) => {
                setFile(e.target.files[0])
                handleCsvUpload(e)
                document.getElementById("file1_label").textContent =
                  e.target.files[0].name
              }}
              required
            />
            <label htmlFor="file1" id="file1_label">
              Choose File
            </label>

            <input
              type="file"
              id="file2"
              name="file2"
              multiple
              onChange={(e) => {
                handleFileChange(e)
                document.getElementById("file2_label").textContent =
                  e.target.files[0].name
              }}
            />
            <label htmlFor="file2" id="file2_label">
              Choose Multiple Files
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileUpload
