import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const moneyGrooveTheme = createMuiTheme(
  {
      typography:{
         fontFamily:[
            'Source Sans Pro',
            'Avenir LT Std',
            'Roboto'
         ].join(','),
         fontWeightMedium: 600,
         fontWeightBold: 700,
      },
      "palette":{
        "primary":{
             "light":"rgba(245, 0, 87, 0.5)",
             "main":"rgba(245, 0, 87, 1)",
             "dark":"rgba(140, 0, 50, 1)",
             "contrastText":"#fff"
          },
        "secondary":{
             "light":"rgba(17, 157, 164, 0.5)",
             "main":"rgba(17, 157, 164, 1)",
             "dark":"rgba(5, 61, 71, 1)",
             "contrastText":"#fff"
          },
          "navbar": {
            "links": "rgba(40, 40, 40, 0.6)",
            "selectedLink": "rgba(40, 40, 40, 0.8)",
          }
         // "common":{
         //    "black":"#000",
         //    "white":"#fff"
         // },
         // "background":{
         //    "paper":"#fff",
         //    "default":"#fafafa"
         // },
         // "secondary":{
         //    "light":"rgba(235, 0, 40, 1)",
         //    "main":"rgba(234, 0, 41, 1)",
         //    "dark":"rgba(201, 0, 34, 1)",
         //    "contrastText":"#fff"
         // },
         // "error":{
         //    "light":"rgba(129, 255, 220, 1)",
         //    "main":"rgba(0, 255, 185, 1)",
         //    "dark":"rgba(0, 201, 146, 1)",
         //    "contrastText":"rgba(0, 0, 0, 1)"
         // },
         // "text":{
         //    "primary":"rgba(0, 0, 0, 0.87)",
         //    "secondary":"rgba(0, 0, 0, 0.54)",
         //    "disabled":"rgba(0, 0, 0, 0.38)",
         //    "hint":"rgba(0, 0, 0, 0.38)"
         // }
      },
      customs: {
          // My business variables
          title: {
              color: "#232a3d",
              color2: "#232a3d"
          },
          secondaryTitle: {
              color: "grey",
              color2: "#999999"
          },
      },
   }
)
export default moneyGrooveTheme;
