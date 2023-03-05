//React code to upload a file to the server from the user's computer
import React from "react";
import styles from "./FileUpload.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

const FileUpload = () => {
  const [fromMail, setFromMail] = useState("");
  const [password, setPassword] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [subject, setSubject] = useState("");
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("fromMail", fromMail);
    data.append("password", password);
    data.append("subject", subject);
    data.append("content", emailContent);
    data.append("inputFile", file);
    data.append("mailAttachments", files);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://agarjun007.pythonanywhere.com/api/send-mail",
      headers: { "Content-Type": "multipart/form-data" },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        window.alert("Mail Sent Successfully");
      })
      .catch(function (error) {
        console.log(error);
        window.alert("Mail Sending Failed Sucessfully");
      });
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.first_view_container}>
        <div className={styles.first_view}>
          <img src="/fvimg.webp" alt="" className={styles.fv_image} />
          <div className={styles.fv_texts}>
            <p className={styles.pre_header}>
              BuildNShip: Made for FOSS Hack'23
            </p>
            <p className={styles.fv_heading}>
              Senting group emails has never been easier. Introducing Mailman.
            </p>
            <p className={styles.fv_tagline}>
              Your go-to open source mail service for effortlessly sending group
              emails.
            </p>
            <button className={styles.view_code}>Sent Mail</button>
          </div>
        </div>
      </div>
      <div className={styles.second_view_container}>
        <div className={styles.second_view}>
          <div className={styles.box_container}>
            <p className={styles.b_heading}>Enter Your Credentials</p>
            <p className={styles.b_tagline}>
              Your detials aren't stored anywhere so, its very secure.
            </p>
          </div>
          <div className={styles.box_container}>
            <p className={styles.b_heading}>Enter Mail Content</p>
            <p className={styles.b_tagline}>
              Your detials aren't stored anywhere so, its very secure.
            </p>
          </div>
          <div className={styles.box_container}>
            <p className={styles.b_heading}>Upload CSV File</p>
            <p className={styles.b_tagline}>
              Your detials aren't stored anywhere so, its very secure.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.form_view_container}>
        <form className={styles.form_view}>
          <div className={styles.rows}>
            <div className={styles.row}>
              <label className={styles.form_label} htmlFor="frommail">
                Enter From-Mail Address
              </label>
              <input
                required
                value={fromMail}
                onChange={(e) => {
                  setFromMail(e.target.value);
                }}
                className={styles.form_field}
                type="email"
                name="frommail"
              />
            </div>

            <div className={styles.row}>
              <label className={styles.form_label} htmlFor="password">
                Enter Password
              </label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                value={password}
                className={styles.form_field}
                type="text"
                name="password"
              />
            </div>

            <div className={styles.row}>
              <label className={styles.form_label} htmlFor="mailsubject">
                Enter Mail Subject
              </label>
              <input
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
                required
                value={subject}
                className={styles.form_field}
                type="text"
                name="mailsubject"
              />
            </div>
          </div>

          <div className={styles.row}>
            <label className={styles.form_label} htmlFor="textarea">
              Email Content Content
            </label>
            <textarea
              required
              onChange={(e) => {
                setEmailContent(e.target.value);
              }}
              name="textarea"
              id=""
            ></textarea>
          </div>

          <div className={styles.rows}>
            <div className={styles.row}>
              <label className={styles.form_label} htmlFor="file">
                Upload Mailing List(CSV)
              </label>
              <input
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
                required
                className={styles.form_field}
                type="file"
                name="file"
                id="file"
                accept=".csv"
              />
            </div>

            <div className={styles.row}>
              <label className={styles.form_label} htmlFor="file-upload">
                Upload Mailing Attachments(Multiple Files)
              </label>
              <input
                onChange={(e) => {
                  onChange = { handleFileChange };
                }}
                required
                className={styles.form_field}
                type="file"
                multiple
                id="file-upload"
                accept=".png, .jpg, .jpeg"
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className={styles.submit_button}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FileUpload;
