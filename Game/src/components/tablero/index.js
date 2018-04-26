import React, { Component } from 'react';
import '../../style/App.css';
import '../../style/tablero.css';
import  axios  from 'axios';
class Tablero extends Component{
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
        //console.log(localStorage.getItem("partida"));
        this.state = {
            numbers: this.obtenerMatriz(JSON.parse(localStorage.getItem("partida")).matriz),
            turno:1,
            tipo:JSON.parse(localStorage.getItem("partida")).tipo,
            nivel:JSON.parse(localStorage.getItem("partida")).nivel,
            ganador:0,
            ID_Partida:JSON.parse(localStorage.getItem("partida")).ID_Partida,
            ID_SJ:JSON.parse(localStorage.getItem("partida")).id_sesion,
            EstadoPartida:1,
            PuntosP1:0,
            PuntosP2:0,
            n:parseInt(JSON.parse(localStorage.getItem("partida")).n)
        }
    }
    obtenerMatriz = function (matrizString){
        console.log(matrizString.length);
        var matrizFinal = [];
        for (let i = 0; i < matrizString.length; i++) {
            var matAux = [];
            for (let j = 0; j < Math.sqrt(matrizString.length); j++) {
                matAux.push(parseInt(matrizString[i+j]));
            }
            matrizFinal.push(matAux);
            i += Math.sqrt(matrizString.length) - 1;
        }
        return matrizFinal;
    }
    recuperarPartida=()=>{
        axios.post('http://172.24.74.178:8080/partidaActual',{
                id_sesion:this.state.ID_SJ
                })
                .then(result => {
                    //console.log(result);
                    if(result.data.success==true){
                        //console.log(result);
                        this.setState({ID_Partida:result.data.data[0].ID
                                    ,ID_SJ:result.data.data[0].ID_SJ,numbers:this.obtenerMatriz(result.data.data[0].MatrizJuego),
                                PuntosP1:result.data.data[0].PuntosP1,PuntosP2:result.data.data[0].PuntosP2,turno:result.data.data[0].Turno})
                    }
                    else{
                        alert("Select a game desactive")
                        }
                    }
                )
                .catch(error=> {
                console.log(error);
                });
    }
    handleClick(e){
        e.preventDefault();
        const  {param}=e.target.dataset;
        var data=JSON.parse(param);
        //console.log(this.state);
        console.log(this.state.numbers);
        axios.post('http://172.24.74.178:8080/movimiento', {
         x: data.X,
         y: data.Y,
         jug: this.state.turno,
         tipo:this.state.tipo,
         nivel:this.state.nivel,
         ID_Partida:this.state.ID_Partida,
         ID_SJ:this.ID_SJ,
         EstadoPartida:this.EstadoPartida
         })
         .then(result => {
             //console.log(result.data.data.matriz);
             console.log(result);
             this.setState({
                 numbers:result.data.data.matriz,
                 turno:result.data.data.turno,
                 tipo:this.state.tipo,
                 nivel:result.data.data.nivel,
                 ganador:result.data.data.ganador,
                 PuntosP1:result.data.data.PuntosP1,
                 PuntosP2:result.data.data.PuntosP2,
                 ganador:result.data.data.ganador
             });
         })
         .catch(error=> {
            alert(error)
         });
    }
    componentDidMount() {
        this.interval = setInterval(this.recuperarPartida, 250);
      }
    componentWillUnmount() {
        clearInterval(this.interval);
      }
    render(){
        var w = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        var h = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;

        var n=parseInt(this.state.n);
        h=h-100;
        w=w-100;
        var dimension=0;
        if(h<w){
           dimension=h/n;
        }
        else{
            dimension=w/n;
        }
        var numbers1 =this.state.numbers;
        //console.log(this.state.numbers)
        const colorPlayer1='red';
        const colorPlayer2='orange';
        var numbers2=numbers1;
        for(var i=0;i<numbers1.length;i++){
            for(var j=0;j<numbers1.length;j++){
                if(numbers1[i][j]===0){
                    const btnStyle0= {
                        background:'rgba(76, 175, 80, 0.3)',
                        BackgroundSize:'6em',
                        color:'white',
                        height:dimension,
                        width: dimension,
                        Display: 'table',
                        Margin: '20px auto',
                        borderRadius: '100%',
                        cursor:'pointer',
                        boxShadow: 'inset 0 10px 15px rgba(255,255,255,.35), inset 0 -10px 15px rgba(0,0,0,.05), inset 10px 0 15px rgba(0,0,0,.05), inset -10px 0 15px rgba(0,0,0,.05), 0 5px 20px rgba(0,0,0,.1)'
                    };
                    const temporal=<td className="tablero"><button style={btnStyle0} data-param={JSON.stringify({X:i,Y:j})} onClick={this.handleClick}>
                    </button>
                    </td>;
                    numbers2[i][j]=temporal;
                }
                else if(numbers1[i][j]===1){
                    const btnStyle1= {
                        background:colorPlayer2,
                        BackgroundSize:'6em',
                        color:'red',
                        height:dimension,
                        width: dimension,
                        Display: 'table',
                        Margin: '20px auto',
                        borderRadius: '100%',
                        cursor:'pointer',
                        boxShadow: 'inset 0 10px 15px rgba(255,255,255,.35), inset 0 -10px 15px rgba(0,0,0,.05), inset 10px 0 15px rgba(0,0,0,.05), inset -10px 0 15px rgba(0,0,0,.05), 0 5px 20px rgba(0,0,0,.1)'
                    };
                    const temporal=<td className="tablero"><button style={btnStyle1} data-param={JSON.stringify({X:i,Y:j})} onClick={this.handleClick}>
                    </button>
                    </td>;
                    numbers2[i][j]=temporal;
                }
                else{
                    const btnStyle2= {
                        background:colorPlayer1,
                        BackgroundSize:'6em',
                        color:'red',
                        height:dimension,
                        width: dimension,
                        Display: 'table',
                        Margin: '20px auto',
                        borderRadius: '100%',
                        cursor:'pointer',
                        boxShadow: 'inset 0 10px 15px rgba(255,255,255,.35), inset 0 -10px 15px rgba(0,0,0,.05), inset 10px 0 15px rgba(0,0,0,.05), inset -10px 0 15px rgba(0,0,0,.05), 0 5px 20px rgba(0,0,0,.1)'
                    };
                    const temporal=<td className="tablero"><button style={btnStyle2} data-param={JSON.stringify({X:i,Y:j})} onClick={this.handleClick}>
                    </button>
                    </td>;
                    numbers2[i][j]=temporal;
                }
            }
        }
        const listItems = numbers1.map((x,i) =>
            <tr>
                {x.map((y,j)=>
                    numbers2[i][j])}
            </tr>);
        var divStyle = {
            overflowScrolling:'auto',
            overflowX:'auto',
            overflowY:'auto',
            textAlign:'center'
            
        };
        return(
            <div style={divStyle}>
                <table className="tablero">
                    {listItems}
                </table>
            </div>
        )
    }
}
export default Tablero;