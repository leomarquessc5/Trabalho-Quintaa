var article = document.querySelector('article');
var section = document.querySelector('section');
var requestURL = 'https://raw.githubusercontent.com/leomarquessc5/projeto2804/d6d2990933b64223a6e3adff0e0fb13ddd7eb856/JS/Aluno.json';
var request = new XMLHttpRequest();

request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function () {
    var aa = request.response;
    populateArticle(aa);
    mostrarAluno(aa);
}

function mostrarAluno(jsonObj) {
    var alunos = jsonObj[0]['escola'];
    for (var i = 0; i < alunos.length; i++) {
        var myArticle = document.createElement('article');
        var myH2 = document.createElement('h2');
        var myPara1 = document.createElement('p');
        var myPara2 = document.createElement('p');
        var myPara3 = document.createElement('p');
        // var myList = document.createElement('ul');
        myH2.textContent = alunos[i].name;
        // colocar um for para cada array
        myPara1.textContent = 'Matrícula: ' + alunos[i].matricula;
        myPara2.textContent = 'Atividade Extra: ' + alunos[i].atividade_id[0];
        myPara3.textContent = 'Responsavel:' + alunos[i].responsavel_id[0];

        article.appendChild(myH2);
        article.appendChild(myPara1);
        article.appendChild(myPara2);
        article.appendChild(myPara3);
        article.appendChild(myArticle);
    }

}

function populateArticle(jsonObj) {
    var myH1 = document.createElement('h1');
    myH1.textContent = jsonObj[0]['nome_escola'];
    article.appendChild(myH1);
}