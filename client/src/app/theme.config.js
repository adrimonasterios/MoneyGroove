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
             "intense":"rgba(56, 25, 221, 1)",
             "contrastText":"#fff"
          },
        "secondary":{
             "light":"rgba(139, 62, 223, 0.5)",
             "main":"rgba(139, 62, 223, 1)",
             "dark":"rgba(101, 42, 164, 1)",
             "intense":"rgba(165, 83, 255, 1)",
             "contrastText":"#fff"
          },
          "background": "#F7F7F7",
          "callToAction": {
            "main": "rgba(173, 200, 37, 1)",
            "light": "rgba(173, 200, 37, 0.7)",
            "dark": "rgba(161, 186, 34, 1)",
            "intense": "rgba(183, 213, 29, 1)",
          },
          "navbar": {
            "links": "#fff",
            "selectedLink": "rgba(40, 40, 40, 0.8)",
          },
         "error":{
            "light":"rgba(247, 77, 107, 1)",
            "main":"rgba(255, 59, 94, 1)",
            "dark":"rgba(250, 29, 68, 1)",
            "contrastText":"rgba(255, 255, 255, 1)"
         },
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
