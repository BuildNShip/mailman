import React, { useState, useEffect } from "react";
import { Progress } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import styles from "./ReportPage.module.css";

const ReportPage = ({ totalNumber, successList, failureList }) => {
  useEffect(() => {
    console.log(successList.length);
    console.log(failureList.length);
    let progressCount =
      ((successList.length + failureList.length) / totalNumber) * 100;
    console.log(progressCount);
    setProgress(progressCount);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((dots) => (dots + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState(0);

  return (
    <div className={styles.background_container}>
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
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
            <div className={styles.report_section}>
              <p className={styles.report_text}>
                {successList.length + failureList.length === totalNumber &&
                  "Completed"}
              </p>
              <p className={styles.report_text} style={{ color: "#ffffff" }}>
                {successList.length + failureList.length !== totalNumber &&
                  `Progressing${".".repeat(dots + 1)}`}
              </p>
              <Progress colorScheme="green" size="lg" value={progress} />
              <p className={styles.progress_text}>
                {successList.length + failureList.length}/{totalNumber} Mails
                Sent
              </p>
            </div>
            <div className={styles.table_container}>
              <div className={styles.table}>
                <TableContainer style={{ flex: 1 }}>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th style={{ fontSize: "1rem", color: "#ffffff" }}>
                          Failed List{" "}
                          <span style={{ color: "#F70000" }}>
                            {" "}
                            {failureList.length}
                          </span>{" "}
                        </Th>
                      </Tr>
                    </Thead>
                    {failureList.map((item) => (
                      <Tbody>
                        <Tr>
                          <Td>{item}</Td>
                        </Tr>
                      </Tbody>
                    ))}
                  </Table>
                </TableContainer>
              </div>
              <div className={styles.table}>
                <TableContainer style={{ flex: 1 }}>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th style={{ fontSize: "1rem", color: "#ffffff" }}>
                          Success List{" "}
                          <span style={{ color: "#38A169" }}>
                            {successList.length}
                          </span>
                        </Th>
                      </Tr>
                    </Thead>
                    {successList.map((item) => (
                      <Tbody>
                        <Tr>
                          <Td>{item}</Td>
                        </Tr>
                      </Tbody>
                    ))}
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
