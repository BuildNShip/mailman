//React code to upload a file to the server from the user's computer
import React from "react";
import styles from "./FileUpload.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

import { GrSecure } from "react-icons/gr";

const FileUpload = () => {
  const [fromMail, setFromMail] = useState("");
  const [password, setPassword] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fromMail", fromMail);
    formData.append("password", appId);
    formData.append("emailContent", emailContent);
    formData.append("file", file);
    console.log(formData);
    axios
      .post("mailman.buildandship.in/api/send-mail", formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.first_view_container}>
        <div className={styles.first_view}>
          <img src="/fvimg.png" alt="" className={styles.fv_image} />
          <div className={styles.fv_texts}>
            <p className={styles.fv_heading}>MailMan Mass Mailer</p>
            <p className={styles.fv_tagline}>
              Your go-to open source mail service for effortlessly sending group
              emails.
            </p>
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
              value={password}
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
