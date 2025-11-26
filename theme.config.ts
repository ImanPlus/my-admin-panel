import { type ThemeConfig } from "antd";

export const lightMode: ThemeConfig = {
  token: {
    fontFamily: `
    'InterBlack', 
    'InterBold', 
    'InterExtraBold', 
    'InterExtraLight', 
    'InterLight', 
    'InterMedium', 
    'InterRegular', 
    'InterSemiBold', 
    'InterThin',
  `,
  },
  components: {
    Button: {
      defaultBg: "#5C61E6",
      colorText: "#fff ",
      defaultBorderColor: "#5C61E6",
      colorPrimaryHover: "#464ce3",
      defaultHoverBg: "#464ce3",
      defaultHoverColor:"#fff",
      contentFontSize: 15,
      controlHeight:38,
      defaultHoverBorderColor: "#6D788D",
      
    },
    // Collapse: {
    //   fontSize: 17,
    //   headerPadding: "12px 16px",
    //   headerBg: "#F5F5F5",
    //   colorBgContainer: "#fff",
    // },
  },
};

export const darkMode: ThemeConfig = {
  token: {
    fontFamily: `
    'InterBlack', 
    'InterBold', 
    'InterExtraBold', 
    'InterExtraLight', 
    'InterLight', 
    'InterMedium', 
    'InterRegular', 
    'InterSemiBold', 
    'InterThin',
  `,
  },
  components: {
    Button: {
      defaultBg: "#000",
      colorText: "#fff",
      defaultBorderColor: "#5C61E6",
      colorPrimaryHover: "#464ce3",
      defaultHoverBg: "#464ce3",
      defaultHoverColor:"#fff",
      contentFontSize: 15,
      controlHeight:38
    },
    // Collapse: {
    //   fontSize: 17,
    //   headerPadding: "12px 16px",
    //   headerBg: "#F5F5F5",
    //   colorBgContainer: "#fff",
    // },
  },
};