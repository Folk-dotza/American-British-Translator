const { text } = require('body-parser');
const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

    UStoUK(text){
        let translation=text
        translation=translation.replace(/\b(\d{1,2}):(\d{1,2})\b/g,'<span class="highlight">$1.$2</span>')
        const lists=[americanOnly,americanToBritishSpelling];
        for (let list of lists){
            for (let [us,uk] of Object.entries(list).sort((a,b)=>b[0].length-a[0].length)){
                const regex=new RegExp(`\\b${us}\\b`,'gi')
                translation=translation.replace(regex,`<span class="highlight">${uk}</span>`)
            }
        }
        for(let [us,uk] of Object.entries(americanToBritishTitles)){
            const regex=new RegExp(`(?<=\\s|^)${us}(?=\\s|$)`,'gi')
            translation=translation.replace(regex,`<span class="highlight">${uk.charAt(0).toUpperCase()+uk.slice(1)}</span>`)
        }
        for (let [uk,us] of Object.entries(britishOnly).sort((a,b)=>b[1].length-a[1].length)){
            const regex=new RegExp(`\\b${us}\\b`,'gi')
            translation=translation.replace(regex,`<span class="highlight">${uk}</span>`)
        }
        if(translation===text){
            return "Everything looks good to me!"
        }
        return translation;
    }

    UKtoUS(text){
        let translation=text
        translation=translation.replace(/\b(\d{1,2}).(\d{1,2})\b/g,'<span class="highlight">$1:$2</span>')
        const lists=[americanOnly,americanToBritishSpelling];
        for (let [uk,us] of Object.entries(britishOnly).sort((a,b)=>b[0].length-a[0].length)){
            const regex=new RegExp(`\\b${uk}\\b`,'gi')
            translation=translation.replace(regex,`<span class="highlight">${us}</span>`)
        }
        for (let list of lists){
            for (let [us,uk] of Object.entries(list).sort((a,b)=>b[1].length-a[1].length)){
                const regex=new RegExp(`\\b${uk}\\b`,'gi')
                translation=translation.replace(regex,`<span class="highlight">${us}</span>`)
            }
        }
        for (let [us,uk] of Object.entries(americanToBritishTitles)){
            const regex=new RegExp(`(?<=\\s|^)${uk}(?=\\s|$)`,'gi')
            translation=translation.replace(regex,`<span class="highlight">${us.charAt(0).toUpperCase()+us.slice(1)}</span>`) 
        }
        if(translation===text){
            return "Everything looks good to me!"
        }
        return translation;
    }
}

module.exports = Translator;