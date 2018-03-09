import React, { Component } from 'react';
import '../../../style/App.css';
import '../../../style/tablero.css';
class Tablero extends Component{
    render(){
        const btnStyle = {
        background:'red',
        BackgroundSize:'6em',
        color:'red',
        height:'75px',
        width: '75px',
        Display: 'table',
        Margin: '20px auto',
        borderRadius: '100%',
        cursor:'pointer',
        boxShadow: 'inset 0 10px 15px rgba(255,255,255,.35), inset 0 -10px 15px rgba(0,0,0,.05), inset 10px 0 15px rgba(0,0,0,.05), inset -10px 0 15px rgba(0,0,0,.05), 0 5px 20px rgba(0,0,0,.1)'
    };
        const numbers = [['0','1','1','0','1','1','2','2'],['0','1','1','0','1','1','2','2'],['0','1','1','0','1','1','2','2'],['0','1','1','0','1','1','2','2'],['0','1','1','0','1','1','2','2'],['0','1','1','0','1','1','2','2'],['0','1','1','0','1','1','2','2'],['0','1','1','0','1','1','2','2']];
        const colorPlayer1='red';
        const colorPlayer2='orange';

        function handleClick(e){
            e.preventDefault();
            const  {param}=e.target.dataset;
            alert(param);
        }
                const numbers2=numbers;
                for(var i=0;i<numbers.length;i++){
                    for(var j=0;j<numbers.length;j++){
                        if(numbers[i][j]==='0'){
                            const btnStyle0= {
                                    background:'white',
                                    BackgroundSize:'6em',
                                    color:'white',
                                    height:'50px',
                                    width: '50px',
                                    Display: 'table',
                                    Margin: '20px auto',
                                    borderRadius: '100%',
                                    cursor:'pointer',
                                    boxShadow: 'inset 0 10px 15px rgba(255,255,255,.35), inset 0 -10px 15px rgba(0,0,0,.05), inset 10px 0 15px rgba(0,0,0,.05), inset -10px 0 15px rgba(0,0,0,.05), 0 5px 20px rgba(0,0,0,.1)'
                                };
                            console.log(numbers[i][j]);
                            console.log(btnStyle);
                            const temporal=<td className="tablero"><button style={btnStyle0} data-param={JSON.stringify({X:i,Y:j})}onClick={handleClick}>
                            </button>
                            </td>;
                            numbers2[i][j]=temporal;
                        }
                        else if(numbers[i][j]==='1'){
                            const btnStyle1= {
                                background:colorPlayer2,
                                BackgroundSize:'6em',
                                color:'red',
                                height:'50px',
                                width: '50px',
                                Display: 'table',
                                Margin: '20px auto',
                                borderRadius: '100%',
                                cursor:'pointer',
                                boxShadow: 'inset 0 10px 15px rgba(255,255,255,.35), inset 0 -10px 15px rgba(0,0,0,.05), inset 10px 0 15px rgba(0,0,0,.05), inset -10px 0 15px rgba(0,0,0,.05), 0 5px 20px rgba(0,0,0,.1)'
                            };
                            console.log(numbers[i][j])
                            console.log(btnStyle)
                            const temporal=<td className="tablero"><button style={btnStyle1} data-param={JSON.stringify({X:i,Y:j})}onClick={handleClick}>
                            </button>
                            </td>;
                            numbers2[i][j]=temporal;
                        }
                        else{
                            const btnStyle2= {
                                background:'blue',
                                BackgroundSize:'6em',
                                color:'red',
                                height:'50px',
                                width: '50px',
                                Display: 'table',
                                Margin: '20px auto',
                                borderRadius: '100%',
                                cursor:'pointer',
                                boxShadow: 'inset 0 10px 15px rgba(255,255,255,.35), inset 0 -10px 15px rgba(0,0,0,.05), inset 10px 0 15px rgba(0,0,0,.05), inset -10px 0 15px rgba(0,0,0,.05), 0 5px 20px rgba(0,0,0,.1)'
                            };
                            console.log(numbers[i][j]);
                            console.log(btnStyle);
                            const temporal=<td className="tablero"><button style={btnStyle2} data-param={JSON.stringify({X:i,Y:j})}onClick={handleClick}>
                            </button>
                            </td>;
                            numbers2[i][j]=temporal;
                        }
                       // console.log(numbers2[i][j]);
                    }
                }

                /*
                const listItems = numbers.map((x,i) =>
                    <tr>
                       {x.map((y,j)=>
                           <td className="tablero"><button style={btnStyle} data-param={JSON.stringify({X:i,Y:j})}onClick={handleClick}>
                           </button>
                           </td>)}
                   </tr>
                );*/
                const listItems = numbers.map((x,i) =>
                    <tr>
                        {x.map((y,j)=>
                            numbers2[i][j])}
                    </tr>);
                var divStyle = {
                    overflowScrolling:'auto',
                    overflowX:'auto',
                    overflowY:'auto'
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
