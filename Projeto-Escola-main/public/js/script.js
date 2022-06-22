const main = document.querySelector('main');

//requisição principal

function loadHome() {
    fetch('html/home.html')
        .then((res) => {
            return res.text();
        })
        .then((html) => {
            main.innerHTML = html;
        });
}

loadHome();

function loadHTML(url) {
    fetch(url)
        .then((res) => {
            return res.text();
        })
        .then((html) => {
            main.innerHTML = html;
        }).then(() => {
            loadAfter()
        });
}

//requisição menus
const mnHome = document.querySelector('#menuHome');
mnHome.onclick = function () {
    loadHTML('html/home.html')
}
const mnLogin = document.querySelector('#menuLogin');
mnLogin.onclick = function () {
    loadHTML('html/login.html')
}
const mnMatr = document.querySelector('#menuMatricula');
mnMatr.onclick = function () {
    loadHTML('html/aluno/matricula.html')
}

function loadAfter() {

    const btnAgenda = document.getElementById('btnAgenda')
    if (btnAgenda != null) {
        btnAgenda.onclick = function () {
            loadHTML('html/aluno/agenda.html')

            var sectionPrincipal = document.getElementById('principal');
            var sectionExtras = document.getElementById('extras');
            var requestURL = 'http://localhost:3000/escola';
            var request = new XMLHttpRequest();

            request.open('GET', requestURL);
            request.responseType = 'json';
            request.send();
            request.onload = function () {
                var agenda = request.response;
                mostrarPrincipal(agenda);
                mostrarExtras(agenda);
            }

            function mostrarPrincipal(jsonObj) {
                var contador = jsonObj[0]['agendaPrincipal'];
                for (var i = 0; i < contador.length; i++) {
                    var sectionPrincipal = document.getElementById('principal');
                    var myArticle = document.createElement('article');
                    var myH2 = document.createElement('h3');
                    var myPara2 = document.createElement('p');
                    var myPara3 = document.createElement('p');
                    myH2.textContent = contador[i].materia;
                    myPara2.textContent = 'Atividade: ' + contador[i].atividade;
                    myPara3.textContent = 'Data:' + contador[i].data;

                    myArticle.appendChild(myH2);
                    myArticle.appendChild(myPara2);
                    myArticle.appendChild(myPara3);
                    console.log(sectionPrincipal);
                    sectionPrincipal.appendChild(myArticle);
                }

            }

            function mostrarExtras(jsonObj) {
                var contador1 = jsonObj[1]['agendaExtras'];
                for (var i = 0; i < contador1.length; i++) {
                    var sectionExtras = document.getElementById('extras');
                    var myArticle = document.createElement('article');
                    var myH2 = document.createElement('h3');
                    var myPara2 = document.createElement('p');
                    var myPara3 = document.createElement('p');
                    myH2.textContent = contador1[i].materia;
                    myPara2.textContent = 'Atividade: ' + contador1[i].atividade;
                    myPara3.textContent = 'Data:' + contador1[i].data;

                    myArticle.appendChild(myH2);
                    myArticle.appendChild(myPara2);
                    myArticle.appendChild(myPara3);
                    sectionExtras.appendChild(myArticle);
                }

            }
        }
    }

    const btnChat = document.getElementById('btnChat')
    if (btnChat != null) {
        btnChat.onclick = function () {
            loadHTML('html/aluno/chat.html')
        }
    }

    const btnAe = document.getElementById('btnAe')
    if (btnAe != null) {
        btnAe.onclick = function () {
            loadHTML('html/aluno/ae.html')

            var sectionArtes = document.getElementById('aeArtes');
            var sectionEsportes = document.getElementById('aeEsportes');
            var requestURL = '/public/data/ae.json';
            var request = new XMLHttpRequest();

            request.open('GET', requestURL);
            request.responseType = 'json';
            request.send();
            request.onload = function () {
                var agenda = request.response;
                listarArtes(agenda);
                listarEsportes(agenda);
            }

            function listarArtes(jsonObj) {

                var contador = jsonObj[0]['artes'];
                for (var i = 0; i < contador.length; i++) {
                    var myArticle = document.createElement('article');
                    var box = document.createElement("INPUT");
                    box.setAttribute("type", "checkbox");
                    var myH2 = document.createElement('h3');
                    var myPara2 = document.createElement('p');
                    myH2.textContent = contador[i].nome + ":";
                    myPara2.textContent = contador[i].desc + ":";

                    myArticle.appendChild(box);
                    myArticle.appendChild(myH2);
                    myArticle.appendChild(myPara2);
                    sectionArtes.appendChild(myArticle);
                }

            }

            function listarEsportes(jsonObj) {

                var contador1 = jsonObj[1]['esportes'];
                for (var i = 0; i < contador1.length; i++) {
                    var myArticle = document.createElement('article');
                    var box = document.createElement("INPUT");
                    box.setAttribute("type", "checkbox");
                    var myH2 = document.createElement('h3');
                    var myPara2 = document.createElement('p');
                    myH2.textContent = contador1[i].nome + ":";
                    myPara2.textContent = contador1[i].desc + ":";

                    myArticle.appendChild(box);
                    myArticle.appendChild(myH2);
                    myArticle.appendChild(myPara2);
                    sectionEsportes.appendChild(myArticle);
                }

            }
        }
    }

    // ADMIN

    // Matricula Alunos 

    const btnMatriculas = document.getElementById('btnMatriculas')
    if (btnMatriculas != null) {
        btnMatriculas.onclick = function () {
            loadHTML('html/adm/matricula.html')

            var sectionAlunos = document.getElementById('alunos');
            var requestURL = 'http://localhost:3000/escola';
            var request = new XMLHttpRequest();

            request.open('GET', requestURL);
            request.responseType = 'json';
            request.send();
            request.onload = function () {
                var matricula = request.response;
                mostrarAlunos(matricula);
            }

            function mostrarAlunos(jsonObj) {
                var contador3 = jsonObj[2]['matriculas'];
                for (var i = 0; i < contador3.length; i++) {
                    var sectionAlunos = document.getElementById('alunos');
                    var myArticle = document.createElement('article');
                    var myH2 = document.createElement('h3');
                    var myPara2 = document.createElement('p');
                    var myPara3 = document.createElement('p');
                    myH2.textContent = contador3[i].aluno;
                    myPara2.textContent = 'Status: ' + contador3[i].status;
                    myPara3.textContent = 'Atividade Extra: ' + contador3[i].atividades_extras;

                    myArticle.appendChild(myH2);
                    myArticle.appendChild(myPara2);
                    myArticle.appendChild(myPara3);
                    sectionAlunos.appendChild(myArticle);
                    console.log(sectionAlunos.appendChild(myArticle))

                }

            }
        }
    }

    // Falta Alunos 

    const btnFaltas = document.getElementById('btnFaltas')
    if (btnFaltas != null) {
        btnFaltas.onclick = function () {
            loadHTML('html/adm/faltas.html')

            var sectionFaltas = document.getElementById('faltas');
            var requestURL = 'http://localhost:3000/escola';
            var request = new XMLHttpRequest();

            request.open('GET', requestURL);
            request.responseType = 'json';
            request.send();
            request.onload = function () {
                var faltas = request.response;
                mostrarFaltas(faltas);
            }

            function mostrarFaltas(jsonObj) {
                var contador4 = jsonObj[3]['alunos'];
                for (var i = 0; i < contador4.length; i++) {
                    var sectionFaltas = document.getElementById('faltas');
                    var myArticle = document.createElement('article');
                    var myH2 = document.createElement('h3');
                    var myPara3 = document.createElement('p');
                    myH2.textContent = contador4[i].nome;
                    myPara3.textContent = 'Faltas: ' + contador4[i].faltas;

                    myArticle.appendChild(myH2);
                    myArticle.appendChild(myPara3);
                    sectionFaltas.appendChild(myArticle);
                    console.log(sectionFaltas.appendChild(myArticle))

                }

            }
        }
    }

    // Nota Alunos 

    const btnNotas = document.getElementById('btnNotas')
    if (btnNotas != null) {
        btnNotas.onclick = function () {
            loadHTML('html/adm/notas.html')

            var sectionNotas = document.getElementById('notas');
            var requestURL = 'http://localhost:3000/escola';
            var request = new XMLHttpRequest();

            request.open('GET', requestURL);
            request.responseType = 'json';
            request.send();
            request.onload = function () {
                var notas = request.response;
                mostrarNotas(notas);
            }

            function mostrarNotas(jsonObj) {
                var contador5 = jsonObj[3]['alunos'];
                for (var i = 0; i < contador5.length; i++) {
                    console.log(contador5)
                    var sectionNotas = document.getElementById('notas');
                    var myArticle = document.createElement('article');
                    var myH2 = document.createElement('h3');
                    var myPara1 = document.createElement('p');
                    var myPara2 = document.createElement('p');
                    var myPara3 = document.createElement('p');
                    var myPara4 = document.createElement('p');
                    var myPara5 = document.createElement('p');
                    var myPara6 = document.createElement('p');

                    myH2.textContent = contador5[i].nome;
                    myPara1.textContent = 'Matemática: ' + contador5[i].notas.matematica;
                    myPara2.textContent = 'Português: ' + contador5[i].notas.portugues;
                    myPara3.textContent = 'Inglês: ' + contador5[i].notas.ingles;
                    myPara4.textContent = 'História: ' + contador5[i].notas.historia;
                    myPara5.textContent = 'Geografia: ' + contador5[i].notas.geografia;
                    myPara6.textContent = 'Ciências: ' + contador5[i].notas.ciencias;

                    myArticle.appendChild(myH2);
                    myArticle.appendChild(myPara1);
                    myArticle.appendChild(myPara2);
                    myArticle.appendChild(myPara3);
                    myArticle.appendChild(myPara4);
                    myArticle.appendChild(myPara5);
                    myArticle.appendChild(myPara6);
                    sectionNotas.appendChild(myArticle);
                    console.log(sectionNotas.appendChild(myArticle))

                }

            }
        }
    }

    // Email Alunos/Pais ADMIN 

    const btnEmails = document.getElementById('btnEmails')
    if (btnEmails != null) {
        btnEmails.onclick = function () {
            loadHTML('html/adm/listemails.html')

            var sectionEmails = document.getElementById('emails');
            var requestURL = 'http://localhost:3000/escola';
            var request = new XMLHttpRequest();

            request.open('GET', requestURL);
            request.responseType = 'json';
            request.send();
            request.onload = function () {
                var emails = request.response;
                mostrarEmails(emails);
            }

            function mostrarEmails(jsonObj) {
                var contador6 = jsonObj[4]['emails'];
                for (var i = 0; i < contador6.length; i++) {
                    console.log(contador6)
                    var sectionEmails = document.getElementById('emails');
                    var myArticle = document.createElement('article');
                    var myH2 = document.createElement('h3');
                    var myPara1 = document.createElement('p');
                    var myPara2 = document.createElement('p');

                    myH2.textContent = contador6[i].nome;
                    myPara1.textContent = 'Data: ' + contador6[i].data;
                    myPara2.textContent = 'Email: ' + contador6[i].desc;

                    myArticle.appendChild(myH2);
                    myArticle.appendChild(myPara1);
                    myArticle.appendChild(myPara2);
                    sectionEmails.appendChild(myArticle);
                    console.log(sectionEmails.appendChild(myArticle))

                }

            }
        }
    }

    // Contato Pais ADMIN 

    const btnContato = document.getElementById('btnContato')
    if (btnContato != null) {
    btnContato.onclick = function () {
        loadHTML('html/adm/contato.html')
        }
    }

    // Boletim AE's

    const btnAeadmin = document.getElementById('btnAeadmin')
    if (btnAeadmin != null) {
        btnAeadmin.onclick = function () {
            loadHTML('html/adm/ae.html')

            var sectionAe = document.getElementById('ae');
            var requestURL = 'http://localhost:3000/escola';
            var request = new XMLHttpRequest();

            request.open('GET', requestURL);
            request.responseType = 'json';
            request.send();
            request.onload = function () {
                var ae = request.response;
                mostrarAe(ae);
            }

            function mostrarAe(jsonObj) {
                var contador8 = jsonObj[3]['alunos'];
                for (var i = 0; i < contador8.length; i++) {
                    console.log(contador8)
                    var sectionAe = document.getElementById('ae');
                    var myArticle = document.createElement('article');
                    var myH2 = document.createElement('h3');
                    var myPara1 = document.createElement('p');
                    var myPara2 = document.createElement('p');

                    myH2.textContent = contador8[i].nome;
                    myPara1.textContent = 'Modalidade: ' + contador8[i].atividade_extra.modalidade;
                    myPara2.textContent = 'Status: ' + contador8[i].atividade_extra.status;

                    myArticle.appendChild(myH2);
                    myArticle.appendChild(myPara1);
                    myArticle.appendChild(myPara2);
                    sectionAe.appendChild(myArticle);
                    console.log(sectionAe.appendChild(myArticle))

                }

            }
        }
    }


    // Financeiro AE's

    const btnControle = document.getElementById('btnControle')
    if (btnControle != null) {
        btnControle.onclick = function () {
            loadHTML('html/adm/financeiro.html')

            var sectionFinanceiro = document.getElementById('financeiro');
            var requestURL = 'http://localhost:3000/escola';
            var request = new XMLHttpRequest();

            request.open('GET', requestURL);
            request.responseType = 'json';
            request.send();
            request.onload = function () {
                var financeiro = request.response;
                mostrarAe(financeiro);
            }

            function mostrarAe(jsonObj) {
                var contador9 = jsonObj[3]['alunos'];
                for (var i = 0; i < contador9.length; i++) {
                    console.log(contador9)
                    var sectionFinanceiro = document.getElementById('financeiro');
                    var myArticle = document.createElement('article');
                    var myH2 = document.createElement('h3');
                    var myPara1 = document.createElement('p');

                    myH2.textContent = contador9[i].nome;
                    myPara1.textContent = 'Status: ' + contador9[i].atividade_extra.financeiro;

                    myArticle.appendChild(myH2);
                    myArticle.appendChild(myPara1);
                    sectionFinanceiro.appendChild(myArticle);
                    console.log(sectionFinanceiro.appendChild(myArticle))

                }

            }
        }
    }

    //PAIS

     // Boletim do Filho

     const btnBoletim = document.getElementById('btnBoletim')
     if (btnBoletim != null) {
        btnBoletim.onclick = function () {
             loadHTML('html/pais/notas.html')
 
             var sectionBoletim = document.getElementById('boletim');
             var requestURL = 'http://localhost:3000/escola';
             var request = new XMLHttpRequest();
 
             request.open('GET', requestURL);
             request.responseType = 'json';
             request.send();
             request.onload = function () {
                 var boletim = request.response;
                 mostrarAe(boletim);
             }
 
             function mostrarAe(jsonObj) {
                var aluno = jsonObj[3]['alunos'];
                var sectionBoletim = document.getElementById('boletim');
                var myArticle = document.createElement('article');
                var myH2 = document.createElement('h3');
                var myPara1 = document.createElement('p');
                var myPara2 = document.createElement('p');
                var myPara3 = document.createElement('p');
                var myPara4 = document.createElement('p');
                var myPara5 = document.createElement('p');
                var myPara6 = document.createElement('p');

                myH2.textContent = aluno[0].nome;
                myPara1.textContent = 'Matemática: ' + aluno[0].notas.matematica;
                myPara2.textContent = 'Português: ' + aluno[0].notas.portugues;
                myPara3.textContent = 'Inglês: ' + aluno[0].notas.ingles;
                myPara4.textContent = 'História: ' + aluno[0].notas.historia;
                myPara5.textContent = 'Geografia: ' + aluno[0].notas.geografia;
                myPara6.textContent = 'Ciências: ' + aluno[0].notas.ciencias;

                myArticle.appendChild(myH2);
                myArticle.appendChild(myPara1);
                myArticle.appendChild(myPara2);
                myArticle.appendChild(myPara3);
                myArticle.appendChild(myPara4);
                myArticle.appendChild(myPara5);
                myArticle.appendChild(myPara6);

                sectionBoletim.appendChild(myArticle);
                console.log(sectionBoletim.appendChild(myArticle))
             }
         }
     }

      // Frequência do Filho

      const btnFrequencia = document.getElementById('btnFrequencia')
      if (btnFrequencia != null) {
        btnFrequencia.onclick = function () {
              loadHTML('html/pais/frequencia.html')
  
              var sectionFrequencia = document.getElementById('frequencia');
              var requestURL = 'http://localhost:3000/escola';
              var request = new XMLHttpRequest();
  
              request.open('GET', requestURL);
              request.responseType = 'json';
              request.send();
              request.onload = function () {
                  var frequencia = request.response;
                  mostrarAe(frequencia);
              }
  
              function mostrarAe(jsonObj) {
                 var aluno = jsonObj[3]['alunos'];
                 var sectionFrequencia = document.getElementById('frequencia');
                 var myArticle = document.createElement('article');
                 var myH2 = document.createElement('h3');
                 var myPara1 = document.createElement('p');
 
                 myH2.textContent = aluno[0].nome;
                 myPara1.textContent = 'Total de Faltas: ' + aluno[0].faltas;
 
                 myArticle.appendChild(myH2);
                 myArticle.appendChild(myPara1);
 
                 sectionFrequencia.appendChild(myArticle);
                 console.log(sectionFrequencia.appendChild(myArticle))
              }
          }
      }

    //redirect plano de ensino

    const btnPlano = document.getElementById('btnPlano')
    if (btnPlano != null) {
        btnPlano.onclick = function () {
        loadHTML('html/pais/planoensino.html')
        }
    }

    //redirect email para o professor

    const btnEmailProf = document.getElementById('btnEmailProf')
    if (btnEmailProf != null) {
        btnEmailProf.onclick = function () {
        loadHTML('html/professores/EmailProf.html')
        }
    }
    //redirect chat

    const btnChatP = document.getElementById('btnChat')
    if (btnChatP != null) {
        btnChatP.onclick = function () {
        loadHTML('html/aluno/chat.html')
        }
    }
    //redirect matricula

    const btnAeM = document.getElementById('btnAeM')
    if (btnAeM != null) {
        btnAeM.onclick = function () {
        loadHTML('html/pais/matricula.html')
        }
    }

    //PROF

    //redirect registro nota

    const btnRNota = document.getElementById('btnRNota')
    if (btnRNota != null) {
        btnRNota.onclick = function () {
        loadHTML('html/professores/RegistroNota.html')
        }
    }

    //redirect registro falta

    const btnRfalta = document.getElementById('btnRfalta')
    if (btnRfalta != null) {
        btnRfalta.onclick = function () {
        loadHTML('html/professores/RegistroFalta.html')
        }
    }

    //redirect agenda prof

    const btnAgendaProf = document.getElementById('btnAgendaProf')
    if (btnAgendaProf != null) {
        btnAgendaProf.onclick = function () {
        loadHTML('html/professores/AgendaProf.html')
        }
    }

    //REDIRECTS LOGIN

    const btnLogin = document.getElementById('btnLog1')
    if (btnLogin != null) {
        btnLogin.onclick = function () {
            let user = document.getElementById('user').value
            let password = document.getElementById('password').value

            if (user == 'aluno' && password == 'aluno') {
                loadHTML('html/aluno/areaAluno.html')
            }
            else if (user == 'pai' && password == 'pai') {
                loadHTML('html/pais/areaResponsaveis.html')
            }
            else if (user == 'admin' && password == 'admin') {
                loadHTML('html/adm/home.html')
            }
            else if (user == 'prof' && password == 'prof') {
                loadHTML('html/professores/areaprof.html')
            }
            else {
                window.alert('Usuário não encontrado. Verifique o login e senha.')
            }
        }
    }
}