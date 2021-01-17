const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());



function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;
    
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');
    
    const naturalLanguageUnderstanding  = new NaturalLanguageUnderstandingV1({
      version: '2020-08-01',
      authenticator: new IamAuthenticator({
        apikey: api_key,
      }),
      serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
  }


  function analyze( textToAnalize, res )
  {
    
    let naturalLanguageUnderstanding = getNLUInstance();

    // const analyzeParams = {
    //     'url': 'www.ibm.com',
    //     'features': {
    //       'categories': {
    //         'limit': 3
    //       }
    //     }
    //   };
      
    // const analyzeParams = {
    //     'html': '<html><head><title>Fruits</title></head>' +
    //     '<body><h1>Text to Analyze</h1><p>' + textToAnalize +'</p></body></html>',
    //     'features': {
    //       'emotion': {
    //         'targets': [
    //           'apples',
    //           'oranges'
    //         ]
    //       }
    //     }
    //   };

    const analyzeParams = {
        'html': '<html><head><title>Fruits</title></head><body><h1>Apples and Oranges</h1><p>'+ textToAnalyze +'</p></body></html>',
        'features': {
          'emotion': {
            'targets': [
              'apples',
              'oranges'
            ]
          }
        }
      };
      
      
    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
          console.log(JSON.stringify(analysisResults, null, 2));
          return res.send( analysisResults )
        })
        .catch(err => {
          console.log('error:', err);
          return res.send( "Error: " + err )
        });
  }
  





app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {

    //return res.send({"happy":"90","sad":"10"});
    let textToAnalyze = req.query.text
    analyze( textToAnalyze, res )
});

app.get("/url/sentiment", (req,res) => {
    //return res.send("url sentiment for "+req.query.url);
    let textToAnalyze = req.query.text
    analyze( textToAnalyze, res )
});

app.get("/text/emotion", (req,res) => {
    //return res.send({"happy":"10","sad":"90"});
    let textToAnalyze = req.query.text
    analyze( textToAnalyze, res )
});

app.get("/text/sentiment", (req,res) => {
    let textToAnalyze = req.query.text
    analyze( textToAnalyze, res )
    
    //return res.send("text sentiment for "+req.query.text);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

