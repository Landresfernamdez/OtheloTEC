import React, { Component } from 'react';
import '../../style/App.css';
import '../../style/tablero.css';
import  axios  from 'axios';
class Tablero extends Component{
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
        this.state = {
            numbers: [[0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,1,2,0,0,0],
                [0,0,0,2,1,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0]],
            turno:1,
            tipo:2,
            nivel:3,
            ganador:0
        }
    }
    handleClick(e){
        e.preventDefault();
        const  {param}=e.target.dataset;
        var data=JSON.parse(param);
        axios.post('http://localhost:8080/movimiento', {
         x: data.X,
         y: data.Y,
         jug: this.state.turno,
         tipo:this.state.tipo,
         nivel:this.state.nivel
         })
         .then(result => {
             console.log(result.data.data.matriz);
             this.setState({
                 numbers:result.data.data.matriz,
                 turno:result.data.data.turno,
                 tipo:this.state.tipo,
                 nivel:result.data.data.nivel,
                 ganador:result.data.data.ganador
             });
         })
         .catch(error=> {
         console.log(error);
         });
    }
    render(){
        var w = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        var h = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;

        var n=8;
        h=h-100;
        w=w-100;
        var dimension=0;
        if(h<w){
           dimension=h/n;
        }
        else{
            dimension=w/n;
        }
        const numbers =this.state.numbers;
        const colorPlayer1='red';
        const colorPlayer2='orange';
        const numbers2=numbers;
        for(var i=0;i<numbers.length;i++){
            for(var j=0;j<numbers.length;j++){
                if(numbers[i][j]===0){
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
                else if(numbers[i][j]===1){
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
        const listItems = numbers.map((x,i) =>
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