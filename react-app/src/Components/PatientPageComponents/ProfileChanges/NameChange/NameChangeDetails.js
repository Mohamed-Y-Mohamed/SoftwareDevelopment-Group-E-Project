/**
* Author(s) of this code: 
*
* Joven Manikiza
*/

import { Main, Table, Button, Heading, Breadcrumbs, Paragraph, MultiChoice, Radio } from "govuk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../../Navigation";
import $ from 'jquery';
import Logout from "../../../LoginComponents/Logout";


function NameChangeDetails() {
  const navigate = useNavigate();

      useEffect(() => {
    const title = 'Name Change';
    document.title = title;
  })

    const [response, setResponse] = useState('');
// use this value to query the db
let nhs_number = localStorage.getItem("nhsNo");

  useEffect(() => {
    $.ajax({
        url: 'http://localhost:4000/getData.php',
        type: 'POST',
        data: {
            nhs_number: nhs_number 
        },
        success: function(response) {
            setResponse(JSON.parse(response));  
          
        },
        error: function(error) {
            console.log(error); 
        }
    });
    
  }, []);


  return (
    <div>
      <Navigation pageLink1="/" PageName1="Home"/><Logout />


      <Main>
                <Breadcrumbs>
                    <Breadcrumbs.Link href="/Patient">Home Page</Breadcrumbs.Link>
                    <Breadcrumbs.Link href="/Profile">Profile</Breadcrumbs.Link>
                    <Breadcrumbs.Link hred="/NameChangeStart">Start</Breadcrumbs.Link>
                </Breadcrumbs>

        <Heading>About you</Heading>

        <Table>
          <Table.Row>
            <Table.CellHeader>NHS number:</Table.CellHeader>
            <Table.Cell>{response.NHSNumber}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.CellHeader>First name:</Table.CellHeader>
            <Table.Cell>{response.Forename}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.CellHeader>Last name:</Table.CellHeader>
            <Table.Cell>{response.Surname}</Table.Cell>
          </Table.Row>
        </Table>
      


<Button onClick={() => navigate("/NameChangeBothNames")}>
  Continue
</Button>

<Button onClick={() => navigate("/Profile")} buttonColour="GREY">
  Cancel
</Button>

</Main>
</div>
);
}

export default NameChangeDetails;
