//React code to upload a file to the server from the user's computer
import React from "react";
import styles from "./FileUpload.module.css";
import axios from "axios";
import FormData from "form-data";
import { useState, useEffect } from "react";

const FileUpload = () => {
  const [fromMail, setFromMail] = useState("");
  const [password, setPassword] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("fromMail", fromMail);
    data.append("password", password);
    data.append("subject", subject);
    data.append("content", emailContent);
    data.append("file", file);

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

  return (
    <div className={styles.main_container}>
      <div className={styles.first_view_container}>
        <div className={styles.fv_texts}>
          <img src="/fvimg.png" alt="" className={styles.fv_image} />
          <p className={styles.fv_heading}>MailMan Mass Mailer</p>
          <p className={styles.fv_tagline}>
            Your go-to open source mail service for effortlessly sending group
            emails.
          </p>
        </div>
        <form className={styles.first_view}>
          <div className={styles.row}>
            <label className={styles.form_label} htmlFor="frommail">
              Enter From Mail Address
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

          <div className={styles.row}>
            <label className={styles.form_label} htmlFor="file">
              Choose CSV File
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
