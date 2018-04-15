/**
 * Created by Andres on 3/29/2018.
 */
import React, { Component } from 'react';
import 'react-addons-transition-group';
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" ></link>;
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"></link>;
<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>;
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>;
import {Tabs,Tab} from 'react-bootstrap';
class  Menu extends  Component{
    render(){
        return(
            <html lang="en">
                    <head>
                    <meta charset="UTF-8"></meta>
                    <title> S3 Infrequent Access Calculator</title>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"></link>
                    <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
                    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
                    </head>
                    <body>
                        <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="Create sessions">
                            Tab 1 content
                        </Tab>
                        <Tab eventKey={2} title="Sessions avaible">
                            Tab 2 content
                        </Tab>
                        <Tab eventKey={3} title="My sessions" disabled>
                            Tab 3 content
                        </Tab>
                        </Tabs>
                    </body>
                    </html>
        )
    }
}
