const axios = require("axios");
const cheerio = require("cheerio");
const { formatField } = require("../utils/utils");
const Client = require("../models/Client");
const dataArr = [];

exports.extractData = async (_, res) => {
  try {
    const rootUrl = "https://www.companydetails.in";
    const visitedUrls = new Set();

    // function to fetch HTML from the URL passed
    const fetchHTML = async (url) => {
      try {
        //fetching HTML using axios
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error("Error fetching HTML:", error);
        return null;
      }
    };

    // function to get all the company links
    const extractLinks = (html, num) => {
      // Condition for only getting links on first recursion level
      if (num < 2) {
        const $ = cheerio.load(html);
        const links = [];
        $("a").each((_, element) => {
          const href = $(element).attr("href");
          if (href && href.startsWith("/company") && !visitedUrls.has(href)) {
            links.push(href);
            visitedUrls.add(href);
          }
        });
        return links;
      } else {
        return [];
      }
    };

    // function to extract data and return company object
    const extractData = (html) => {
      const $ = cheerio.load(html);
      // Extractiong values and formatting
      const name = formatField($(".col-xl-9:first").text());
      const cin = formatField($(".col-xl-9").eq(2).text());
      const pinCode = formatField($(".col-xl-8").eq(1).text());
      const state = formatField($(".col-xl-8").eq(0).text());
      const country = formatField($(".col-xl-8").eq(2).text());
      const address = formatField($(".col-xl-8").eq(3).text());
      const email = formatField($(".col-xl-8").eq(4).text());
      // returning data obj for a comany
      return {
        name,
        cin: cin.length === 21 ? cin : "Invalid",
        email,
        address: {
          state,
          pinCode: pinCode.length === 6 ? pinCode : "Invalid",
          address,
          country
        }
      };
    };

    let checkNum = 0;
    // Recursive function to crawl the website
    const crawl = async (url) => {
      const html = await fetchHTML(rootUrl + url);
      if (!html) {
        console.log("Failed to fetch HTML form ", url);
        return;
      }

      if (url !== "/latest-registered-company-mca") {
        const data = extractData(html);
        console.log(data);
        dataArr.push(data);
      }

      checkNum = checkNum + 1;
      const links = extractLinks(html, checkNum);
      for (const link of links) {
        await crawl(link);
      }
    };

    await crawl("/latest-registered-company-mca");

    //Insert Data to DB
    const dataInserted = await Client.insertMany(dataArr);

    if (!dataInserted) {
      return res.status(400).json({ message: "Error adding data in DB" });
    }

    // Sending response
    return res.status(200).json({ message: "Data successfully inserted" });
  } catch (err) {
    return res.status(500).json({ err, message: "Internal Server Error" });
  }
};
