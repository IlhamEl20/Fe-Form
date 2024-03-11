import UAParser from "ua-parser-js";

export default ({ app }, inject) => {
  inject("uaParser", function (userAgent) {
    let parser = new UAParser(userAgent); // you need to pass the user-agent for nodejs
    return parser.getResult();
  });
};
