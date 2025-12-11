import { theme, type ThemeConfig } from "antd";

export const lightMode: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  cssVar:true,
  token: {
    colorBgBase:"#ffffff",
    colorTextBase: "#000000",
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
      defaultHoverColor: "#fff",
      contentFontSize: 15,
      controlHeight: 38,
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
  algorithm: theme.darkAlgorithm,
  cssVar:true,
  token: {
    colorBgBase:"#141414",
    colorTextBase: "#ffffff", 
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
      defaultHoverColor: "#fff",
      contentFontSize: 15,
      controlHeight: 38,
    },
     Input: {
      colorBgContainer: "#1a1a1a",
      colorBorder: "#2a2a2a",
    },
    Select: {
      colorBgContainer: "#1a1a1a",
      colorBorder: "#2a2a2a",
    },
    
    // Collapse: {
    //   fontSize: 17,
    //   headerPadding: "12px 16px",
    //   headerBg: "#F5F5F5",
    //   colorBgContainer: "#fff",
    // },
  },
};
