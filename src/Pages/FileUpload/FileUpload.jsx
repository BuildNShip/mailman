//React code to upload a file to the server from the user's computer
import React from "react";
import styles from "./FileUpload.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Papa from "papaparse";
import { useToast } from "@chakra-ui/react";
import EmailPreview from "../../Components/EmailPreview/EmailPreview";
import ReportPage from "../ReportPage/ReportPage";

const FileUpload = () => {
  const [fromMail, setFromMail] = useState("");
  const [password, setPassword] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [subject, setSubject] = useState("");
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState();
  const [confirm, setConfirm] = useState(false);

  const [successCSV, setSuccessCSV] = useState([]);
  const [failureCSV, setFailureCSV] = useState([]);

  const [failureList, setFailureList] = useState([]);
  const [successList, setSuccessList] = useState([]);

  const [viewReport, setViewReport] = useState(false);

  const [sampleEmail, setSampleEmail] = useState({
    fromMail: "",
    subject: "",
    emailContent: "",
    attachments: [],
  });

  const [csvData, setCsvData] = useState([]);

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const handleEmailPreview = () => {
    setIsEmailModalOpen(true);
  };

  const handleCloseEmailModal = () => {
    setIsEmailModalOpen(false);
  };

  const toast = useToast();

  const handleCsvUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: true,
      complete: (result) => {
        result.data.forEach(function (obj) {
          var new_obj = {};
          Object.keys(obj).forEach(function (key) {
            new_obj[key.toLowerCase()] = obj[key];
          });
          Object.keys(obj).forEach(function (key) {
            delete obj[key];
          });
          Object.assign(obj, new_obj);
        });

        setCsvData(result.data);
      },
    });
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const makeContent = (obj) => {
    let updatedText = emailContent;
    const placeholders = emailContent.match(/{{\w+}}/g);

    if (placeholders) {
      placeholders.forEach((placeholder) => {
        const propName = placeholder
          .substring(2, placeholder.length - 2)
          .toLowerCase();

        updatedText = updatedText.replace(placeholder, obj[propName] || "");
      });
    }
    return updatedText;
  };

  const selectAttachment = (obj) => {
    const attachmentNames = Object.keys(obj).filter(
      (key) => key.startsWith("attachment") && obj[key] !== ""
    );
    const attachments = attachmentNames.map(
      (attachmentName) =>
        files.find((file) => file.name === obj[attachmentName]) || null
    );

    return attachments.filter((attachment) => attachment !== null);
  };

  const handlePreview = (e) => {
    setSampleEmail((prevState) => ({
      ...prevState,
      fromMail: fromMail,
      subject: subject,
      emailContent: makeContent(csvData[0]),
      attachments: selectAttachment(csvData[0]),
    }));

    handleEmailPreview();
  };

  useEffect(() => {
    if (confirm) {
      setViewReport(true);
      csvData.map((obj) => {
        const data = new FormData();
        console.log(csvData);
        data.append("fromMail", fromMail);
        data.append("password", password);
        data.append("to", obj.email);
        data.append("subject", subject);
        data.append("content", makeContent(obj));

        const files = selectAttachment(obj);

        files.forEach((file) => {
          data.append("mailAttachment", file);
        });

        if (!Object.values(obj).every(value => value === '' || value === undefined)){

        

        const config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://api.buildnship.in/mailman/v1/send-mail/",
          headers: { "Content-Type": "multipart/form-data" },
          data: data,
        };

        axios(config)
          .then(function (response) {
            if (!response.data.hasError) {
              //update the success number in the state variable
              setSuccessList((successList) => [
                ...successList,
                response.data.recipient,
              ]);
              setSuccessCSV((successCSV) => [...successCSV, obj]);
            } else {
              setFailureList((failureList) => [
                ...failureList,
                response.data.recipient,
              ]);
              console.log(response.data);
              setFailureCSV((failureCSV) => [...failureCSV, obj]);
            }
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(function () {});
        }
      });
    }

    toast({
      title: "We only support gmail for now",
      status: "info",
      duration: 9000,
      isClosable: true,
    });
    toast({
      title: "Make sure to use your App Password as password",
      description: "Always reset your App Password after use",
      status: "info",
      duration: 9000,
      isClosable: true,
    });
  }, [confirm]);
  return !viewReport ? (
    <div className={styles.background_container}>
      <EmailPreview
        isOpen={isEmailModalOpen}
        onClose={handleCloseEmailModal}
        email={sampleEmail}
        setConfirm={setConfirm}
        confirm={confirm}
      />

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
                setFromMail(event.target.value);
              }}
              type="email"
              value={fromMail}
              required
              placeholder="Enter Your Email Address"
            />

            <input
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              value={password}
              type="password"
              required
              placeholder="Enter Your Email Password"
            />
            <button
              onClick={() => {
                //check whether the email and password are valid or not and there is a mail subject and content and the state variables are not empty
                if (!file) {
                  toast({
                    title: "Upload CSV",
                    status: "error",
                    duration: 9000,
                    position: "top-right",
                    isClosable: true,
                  });
                } else if (
                  fromMail === "" ||
                  password === "" ||
                  subject === "" ||
                  emailContent === ""
                ) {
                  //give a toast message unqiue to each of the above cases
                  toast.closeAll();
                  toast({
                    title: "Please fill all the fields",
                    status: "error",
                    duration: 3000,
                    position: "top-right",
                    isClosable: true,
                  });
                } else if (
                  !fromMail.match(
                    //using regex validate the email pattern
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                  )
                ) {
                  toast.closeAll();
                  toast({
                    title: "Please enter a valid email",
                    status: "error",
                    duration: 3000,
                    position: "top-right",
                    isClosable: true,
                  });
                } else {
                  //using regex validate the email pattern ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$

                  handlePreview();
                }
              }}
              className={styles.sent_mail}
            >
              Sent Mails
            </button>
          </div>
          <div className={styles.subject_row}>
            <input
              onChange={(event) => {
                setSubject(event.target.value);
              }}
              type="text"
              value={subject}
              required
              placeholder="This is the subject of the mail"
            />
          </div>
        </div>
        <div className={styles.mail_body}>
          <textarea
            className={styles.mail_content}
            onChange={(event) => {
              setEmailContent(event.target.value);
            }}
            value={emailContent}
            placeholder="You can enter the content of the mail here, we do support dynamic content. You could use the following syntax to add dynamic content {{column_name}}. For example, if you want to add the name of the person in the mail, you could use {{name}}. The column name should be the same as the column name in the CSV file."
            required
          />
          <div className={styles.attachments}>
            <p className={styles.attachment_label}>Select the CSV File</p>
            <input
              type="file"
              id="file1"
              name="file1"
              onChange={(e) => {
                setFile(e.target.files[0]);
                handleCsvUpload(e);
                document.getElementById("file1_label").textContent =
                  e.target.files[0].name;
              }}
              required
            />
            <label htmlFor="file1" id="file1_label">
              Choose File
            </label>
            <a href="src\Pages\FileUpload\template.csv">
              {" "}
              <p className={styles.download_template}>
                Download the sample CSV file{" "}
              </p>
            </a>
          </div>
          <div className={styles.attachments}>
            <p className={styles.attachment_label}>
              Select all the mail Attachments
            </p>
            <input
              type="file"
              id="file2"
              name="file2"
              multiple
              onChange={(e) => {
                handleFileChange(e);
                const fileNames = Array.from(e.target.files)
                  .map((file) => file.name)
                  .join(", ");
                document.getElementById("file2_label").textContent = fileNames;
              }}
            />
            <label htmlFor="file2" id="file2_label">
              Choose Multiple Files
            </label>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <ReportPage
      csvData={csvData}
      totalNumber={csvData.length}
      successList={successList}
      failureList={failureList}
      successCSV={successCSV}
      failureCSV={failureCSV}
    />
  );
};

export default FileUpload;
