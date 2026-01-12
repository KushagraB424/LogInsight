import sys
from pyspark.sql import SparkSession
from pyspark.sql.functions import regexp_extract, col, substring

def main(log_file):
    spark = SparkSession.builder \
        .appName("LogInsight Spark Analysis") \
        .getOrCreate()

    # Read log file
    logs = spark.read.text(log_file)

    # Parse log fields
    parsed = logs.select(
        regexp_extract("value", r'^(\S+)', 1).alias("ip"),
        regexp_extract("value", r'\[(.*?)\]', 1).alias("timestamp"),
        regexp_extract("value", r'"(GET|POST|PUT|DELETE) (.*?) HTTP', 2).alias("endpoint"),
        regexp_extract("value", r'"\s(\d{3})\s', 1).alias("status")
    )

    # Status code counts
    status_counts = parsed.groupBy("status").count()
    status_counts.coalesce(1).write.mode("overwrite").json("output/status_counts")

    # Top IP addresses
    top_ips = parsed.groupBy("ip") \
        .count() \
        .orderBy(col("count").desc())

    top_ips.coalesce(1).write.mode("overwrite").json("output/top_ips")

    # Traffic by hour
    traffic_by_hour = parsed.withColumn(
        "hour", substring("timestamp", 13, 2)
    ).groupBy("hour").count()

    traffic_by_hour.coalesce(1).write.mode("overwrite").json("output/traffic_by_hour")

    spark.stop()


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python log_analysis.py <log_file>")
        sys.exit(1)

    log_file = sys.argv[1]
    main(log_file)