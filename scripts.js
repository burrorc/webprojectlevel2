let i = 0
      document.addEventListener('click',function(event){
        if(event.target.matches(".cancel")){
          event.target.parentElement.parentElement.remove();
          i --;
          if(i===0){
          $('#title').children('h1').remove();
        }
          
        };
        if(event.target.matches(".nav-link")){
            document.getElementById('closeMe').click()
        }
        
        
      });
      document.getElementById("symbolInput").addEventListener("keyup", function(event){
        if(event.keyCode === 13){
          document.getElementById('getInfo').click()
        }
      });
      //here
      
      let symbol;
      let getSymbol;
      let fromInput;
      getSymbol = function () {
        
        fromInput = document.getElementById("symbolInput").value;
        symbol = fromInput.toUpperCase();
        if(symbol === ""){
          alert("Please Enter A Symbol");
        }
        else{
          
        
        let infourl =
          "https://cloud.iexapis.com/stable/stock/" +
          symbol +
          "/company?token=pk_5dae373d09704896871d6296c6e5b228";
        let quoteurl =
          "https://cloud.iexapis.com/stable/stock/" +
          symbol +
          "/quote?token=pk_5dae373d09704896871d6296c6e5b228";
        let logourl =
          "https://storage.googleapis.com/iex/api/logos/" + symbol + ".png";
        

        $.ajax(infourl)
          .fail(function(){
            alert('Sorry '+symbol+' is not a supported symbol. Please try again');
          }
        )
        .done(function(comp){
            
            if(comp.companyName === null){
              alert('Sorry '+symbol+' is not a supported symbol. Please try again');
          }else{
            i++;
            if(document.getElementById('title').innerText === ""){
                $("#title").append("<h1 style='margin-top: 6px'>Stocks</h1>");
                $("#title").first().css("color","#02a121")
            };
            $("#stocks").prepend(
              "<div class='info col-11 col-sm-6 col-md-5 col-lg-3 border border-success my-3' style='border-radius: 0.5em;'></div>"
            );
            $(".info")
              .first()
              .append(
                "<h3 class='text-center' style='font-size: 85px'>" +
                  comp.symbol +
                  "<button class='cancel' onclick=('remInfo()')>&times;</button></h3>"
              );
            $(".info")
              .first()
              .append("<h5 class='text-center'>" + comp.companyName + "</h5>");

            $(".info")
              .first()
              .append("<img class='logo mt-0' src=" + logourl + ">");

            $("img")
              .on("error",(function() {
                $(".info").first().children("img").attr("src", "nologo.png");
              })),
              
            $(".info")
              .first()
              .append("<div class='site col text-center'></div>");
            $(".site")
              .first()
              .append(
                "<a class='btn btn-success mb-1' target='_blank' href=" +
                  comp.website +
                  " role='button'>Company Site</a>"
              );
              fetch(quoteurl)
            .then((response) => response.json())
            .then((quote) => {
              var color;
              if (quote.change >= 0){
                color = "<span style='color: green'>("+quote.change +")</span>";
              }else{
                color = "<span style='color: red'>("+quote.change +")</span>";
              }

              $(".site")
                .first()
                .before(
                  "<h3 class='price text-center'>$" +
                    quote.latestPrice +
                    " " + color + "</h3>")
                ;
              
            }); 
          }
             
          });
           
        document.getElementById("symbolInput").value = "";
        
      };
      };