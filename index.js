import axios from "axios"
import EventSource from 'eventsource';

export async function chatGPT({ prompt }) {
    return new Promise((resolve, reject) => {
        
    var text = ""

    axios.post("https://gpt4everyone.ai/api.php", {
        message: String(prompt)
    }, {
        headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Accept-Language': 'pt-BR,pt;q=0.9',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Brave";v="126"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'sec-gpc': '1',
            'x-requested-with': 'XMLHttpRequest',
            'Cookie': 'PHPSESSID=gjv15og9cqep12kriuhi219cru',
            'Referer': 'https://gpt4everyone.ai/',
            'Referrer-Policy': 'strict-origin-when-cross-origin'
        }
    }).then(res => {
    
        const eventSource = new EventSource('https://gpt4everyone.ai/api.php?action=retrieve', {
            headers: {
                'Accept': 'text/event-stream',
                'Accept-Language': 'pt-BR,pt;q=0.9',
                'Cache-Control': 'no-cache',
                'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Brave";v="126"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'sec-gpc': '1',
                'Cookie': 'PHPSESSID=gjv15og9cqep12kriuhi219cru',
                'Referer': 'https://gpt4everyone.ai/',
                'Referrer-Policy': 'strict-origin-when-cross-origin'
            }
        });
    
        eventSource.onmessage = function (event) {
    
            try {
                const data = JSON.parse(event.data);
                const content = data.choices[0].delta.content;
    
                if (content) {
                    text += `${content}`;
                }
    
            } catch (error) {
    
                if (event.data === '[DONE]') {
                    eventSource.close();
                    resolve(text);
                }
            }
    
        };
    
    })
    })

}