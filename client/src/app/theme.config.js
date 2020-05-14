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
             "light":"rgba(59, 41, 152, 0.5)",
             "main":"rgba(59, 41, 152, 1)",
             "dark":"rgba(43, 30, 113, 1)",
             "contrastText":"#fff"
          },
        "secondary":{
             "light":"rgba(139, 62, 223, 0.5)",
             "main":"rgba(139, 62, 223, 1)",
             "dark":"rgba(101, 42, 164, 1)",
             "contrastText":"#fff"
          },
          "background": "#F7F7F7",
          "callToAction": "#ADC825",
          "navbar": {
            "links": "rgba(40, 40, 40, 0.6)",
            "selectedLink": "rgba(40, 40, 40, 0.8)",
          },
         // "error":{
         //    "light":"rgba(129, 255, 220, 1)",
         //    "main":"rgba(0, 255, 185, 1)",
         //    "dark":"rgba(0, 201, 146, 1)",
         //    "contrastText":"rgba(0, 0, 0, 1)"
         // },
         "text":{
            "primary":"rgba(0, 0, 0, 0.87)",
            "secondary":"rgba(0, 0, 0, 0.54)",
            "disabled":"rgba(0, 0, 0, 0.38)",
            "hint":"rgba(0, 0, 0, 0.38)"
         }
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
