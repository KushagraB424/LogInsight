# LogInsight – Distributed Log Analysis using PySpark

LogInsight is a **batch log analysis system built using PySpark** that processes large-scale web server access logs to extract meaningful insights such as error distributions, traffic trends, and high-frequency client IPs.

The project demonstrates **distributed data processing**, **command-line driven Spark jobs**, and **clean data engineering practices**.

---

##  Features

- Processes Apache/Nginx-style HTTP access logs
- Distributed log parsing using PySpark DataFrames
- Computes:
  - HTTP status code distribution
  - Most active client IP addresses
  - Traffic volume by hour
- Accepts log file path as a command-line argument
- Designed with clean separation of inputs, processing, and outputs

---

##  Project Structure

LogInsight/
├── spark/
│   ├── log_analysis.py
│   └── output/
├── logs/
│   ├── access.log
│   └── access2.log
└── requirements.txt

##  Requirements

- Python **3.8 – 3.11** (recommended: 3.10)
- Java **8 / 11 / 17** (tested with Java 17)
- Apache Spark (via PySpark)

Install dependencies:
pip install -r requirements.txt

---

## Running it

cd spark
python log_analysis.py ../logs/access.log

## Technologies

- PySpark – Distributed data processing
- Apache Spark SQL – Structured log parsing and aggregation
- Python – Pipeline orchestration
- Linux / Windows – Cross-platform execution

