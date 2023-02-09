window.addEventListener('DOMContentLoaded',()=>{
    let right =0,wrong=0,total=0;
    let url ="https://opentdb.com/api.php?amount=1&type=multiple&token=";
    document.getElementById("nex").addEventListener("click",getquestion);
    document.getElementById("sub").addEventListener("click",checkans);
    let place=randomizeans();
    getquestion();
    document.getElementById("sc").value=`Right:${right}     Wrong:${wrong}     Total:${total}`;
     gettoken();
    let choices =document.querySelectorAll(".t2");
    choices.forEach(element => {
        element.addEventListener("click",()=>{
            choices.forEach(element=>{
                element.classList.remove("highlighted")
            })
            element.classList.add("highlighted")
        });
    })
    async function gettoken() {
        const t = await fetch('https://opentdb.com/api_token.php?command=request');
        const t2 =await t.json()
        const t3 =await t2.token;
        url += t3;
    }

    async function getquestion(){
        document.getElementById("nex").disabled=true;
        document.getElementById("sub").disabled=false;
        place=randomizeans();
        removehighlight();
        const m=await fetch(url);
         quest =await m.json();
        document.getElementById("ques").value =quest.results[0].question.replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"")
        document.getElementById(`a${place[0]}${place[0]}`).value=quest.results[0].correct_answer.replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"");
        document.getElementById(`a${place[1]}${place[1]}`).value=quest.results[0].incorrect_answers[0].replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"");
        document.getElementById(`a${place[2]}${place[2]}`).value=quest.results[0].incorrect_answers[1].replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"");
        document.getElementById(`a${place[3]}${place[3]}`).value=quest.results[0].incorrect_answers[2].replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\""); 
        
    }
    function randomizeans(){
        let numc,numw1,numw2,numw3;
        numc=randnum();
        do{
            numw1=randnum();
        }while(numw1===numc)
        do{
            numw2=randnum();
        }while(numw2===numc||numw2===numw1)
        do{
            numw3=randnum();
        }while(numw3===numc||numw3===numw1||numw3===numw2)
        return[numc,numw1,numw2,numw3];
    }
    function randnum(){
       return Math.floor(Math.random()*4+1)
    }
 async function checkans(){
    
        let posans=document.getElementsByClassName("highlighted")[0].value;
        if(posans!=null){
           
            if(posans==quest.results[0].correct_answer.replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"")){
                right++;
                total++;
                document.getElementById("sub").disabled=true;
                document.getElementsByClassName("highlighted")[0].classList.add("rightans");
            }else if(posans!=quest.results[0].correct_answer.replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"")){
                document.getElementsByClassName("highlighted")[0].classList.add("wrongans");
                wrong++;
                total++;
                document.getElementById("sub").disabled=true;
                document.getElementById(`a${place[0]}${place[0]}`).classList.add("rightans")
            }
        }
        document.getElementById("sc").value=`Right:${right}     Wrong:${wrong}     Total:${total}`;
        document.getElementById("nex").disabled=false;
    }
    function removehighlight(){
        let elem =document.querySelectorAll('.t2')
        elem.forEach(element => {
            element.classList.remove("rightans");
            element.classList.remove("wrongans");
        });
    }
})