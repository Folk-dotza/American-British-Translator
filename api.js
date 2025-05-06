'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const {text,locale}=req.body
      if (text === undefined || locale === undefined) {
        return res.json({ error: 'Required field(s) missing' });
      }
      if (text.trim() === '') {
        return res.json({ error: 'No text to translate' });
      }
      if(locale==="american-to-british"){
        const translation=translator.UStoUK(text)
        return res.json({text,translation})
      }else if(locale==="british-to-american"){
        const translation=translator.UKtoUS(text)
        return res.json({text:text,translation:translation})
      }else{
        return res.json({ error: 'Invalid value for locale field' }) 
      }
    });
};
