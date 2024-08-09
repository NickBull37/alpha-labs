import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Stack, Paper, Typography, Popover } from '@mui/material';
import { Navbar } from '../../../../components';
import ApiIcon from '@mui/icons-material/Api';

const TitleBox = styled(Box)(() => ({
    marginBottom: 8,
    marginTop: 128,
    marginRight: "18%",
    marginLeft: "18%",
}));

const CodeTypo = styled(Typography)(() => ({
    lineHeight: "1.3",
}));

const CodePaper = styled(Paper)(() => ({
    backgroundColor: '#4d4d4d',
    boxShadow: "0px 2px 10px 1px #1a1a1a",
    padding: "24px 20px",
    color: "#fff",
    marginBottom: 72,
    marginRight: "17%",
    marginLeft: "17%"
}));

const ControllerExample = () => {

    const navLinks = [
        {
            index: 1,
            label: 'HOME',
            link: '/dev-home'
        },
        {
            index: 2,
            label: 'FONTS',
            link: '/dev-fonts'
        },
        {
            index: 3,
            label: 'SQL QUERIES',
            link: '/dev-sql'
        },
        {
            index: 4,
            label: 'C# / .NET',
            link: '/dev-csharp'
        },
        {
            index: 5,
            label: 'ReactJS',
            link: '/dev-react'
        },
    ];

    return (
        <Stack>
            <Navbar
                appName={"BullsDev"}
                currentPage={"C# / .NET"}
                navLinks={navLinks}
                linkClassName={"hacked-p-green-grad"}
            />
            <TitleBox>
                <Typography className='dev-h1'>
                    <span className='code-font'>ASP.NET Controller</span>
                </Typography>
            </TitleBox>
            <CodePaper>
                <CodeTypo>
                    <pre className='code-font'>
                        <span className='code-blue'>using</span> Microsoft.AspNetCore.Mvc;<br />
                        <br />
                        <span className='code-blue'>namespace</span> project_name.folder_name<br />
                        &#123;<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;[<span className='code-green'>ApiController</span>]<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;[<span className='code-green'>Route</span>(<span className='code-orange'>"</span><span className='code-extra-blue'>[controller]</span><span className='code-orange'>"</span>)]<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className='code-blue'>public class</span> <span className='code-green'>ExampleController</span> : <span className='code-green'>ControllerBase</span><br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&#123;<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='code-blue'>private readonly</span> <span className='code-light-green'>IExampleWorkflow</span> _workflow;<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='code-blue'>private readonly</span> <span className='code-light-green'>ILogger</span>&lt;<span className='code-green'>ExampleController</span>&gt; _logger;<br />
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='code-blue'>public</span> <span className='code-green'>ExampleController</span>(<span className='code-light-green'>IExampleWorkflow</span> <span className='code-light-blue'>workflow</span>, <span className='code-light-green'>ILogger</span>&lt;<span className='code-green'>ExampleController</span>&gt; <span className='code-light-blue'>logger</span>)<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_workflow = <span className='code-light-blue'>workflow</span>;<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_logger = <span className='code-light-blue'>logger</span>;<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[<span className='code-green'>HttpGet</span>]<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[<span className='code-green'>Route</span>(<span className='code-orange'>"route"</span>)]<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='code-blue'>public async</span> <span className='code-green'>Task</span>&lt;<span className='code-light-green'>IActionResult</span>&gt; <span className='code-yellow'>ExampleMethodName</span>([<span className='code-green'>FromBody</span>] <span className='code-green'>ExampleRequest</span> request)<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='code-dark-green'>// validate incoming request, return immediately if required data is missing</span><br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='code-purple'>if</span> (<span className='code-blue'>string</span>.<span className='code-yellow'>IsNullOrEmpty</span>(<span className='code-light-blue'>request</span>.ExampleValue))<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='code-purple'>return</span> <span className='code-yellow'>BadRequest</span>(<span className='code-blue'>new</span> &#123; message = <span className='code-orange'>"Invalid request"</span> &#125;);<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='code-dark-green'>// execute workflow for request</span><br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='code-blue'>var</span> <span className='code-light-blue'>response</span> = <span className='code-blue'>await</span> _workflow.<span className='code-yellow'>ExecuteWorkflow</span>();<br />
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='code-dark-green'>// return internal server error if incoming request fails</span><br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='code-purple'>if</span> (!<span className='code-light-blue'>response</span>.IsSuccess)<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='code-purple'>return</span> <span className='code-yellow'>Problem</span>(<span className='code-light-blue'>statusCode</span>: <span className='code-light-green'>500</span>);<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='code-dark-green'>// return response</span><br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='code-purple'>return</span> <span className='code-yellow'>Ok</span>(<span className='code-light-blue'>response</span>.Content);<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
                        &#125;<br />
                    </pre>
                </CodeTypo>
            </CodePaper>
        </Stack>
    );
}

export default ControllerExample;