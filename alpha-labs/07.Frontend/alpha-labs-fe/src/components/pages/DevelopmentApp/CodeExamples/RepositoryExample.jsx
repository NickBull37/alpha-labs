import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Stack, Paper, Typography, Popover } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
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

const PopoverTip = styled(Popover)(() => ({
    color: "#1a1a1a",
}));

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'rgba(0, 230, 207, 0.1)',
        backdropFilter: 'blur(11px)',
        color: '#fff',
        maxWidth: 350,
        fontSize: theme.typography.pxToRem(12),
        padding: "9px"
    },
}));

const CodePaper = styled(Paper)(() => ({
    backgroundColor: '#4d4d4d',
    boxShadow: "0px 2px 10px 1px #1a1a1a",
    padding: "24px 20px",
    color: "#fff",
    marginBottom: 72,
    fontFamily: "Consolas, Input, DejaVu Sans Mono"
}));

const CodeLine1 = styled(Typography)(() => ({
    lineHeight: "1.3",
    fontFamily: "Consolas, Input, DejaVu Sans Mono"
}));
const CodeLine2 = styled(Typography)(() => ({
    lineHeight: "1.3",
    fontFamily: "Consolas, Input, DejaVu Sans Mono",
    paddingLeft: "32px"
}));
const CodeLine3 = styled(Typography)(() => ({
    lineHeight: "1.3",
    fontFamily: "Consolas, Input, DejaVu Sans Mono",
    paddingLeft: "64px"
}));
const CodeLine4 = styled(Typography)(() => ({
    lineHeight: "1.3",
    fontFamily: "Consolas, Input, DejaVu Sans Mono",
    paddingLeft: "96px"
}));
const CodeLine5 = styled(Typography)(() => ({
    lineHeight: "1.3",
    fontFamily: "Consolas, Input, DejaVu Sans Mono",
    paddingLeft: "128px"
}));

const RepositoryExample = () => {

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
                    <span className='code-font'>ASP.NET Repository</span>
                </Typography>
                <CodePaper>
                    <CodeLine1>
                        using Microsoft.EntityFrameworkCore; 
                    </CodeLine1>
                    <br />
                    <CodeLine1>
                        <span className='code-blue'>namespace</span> project_name.folder_name<br />
                    </CodeLine1>
                    <CodeLine1>
                        &#123;
                    </CodeLine1>
                    <CodeLine2>
                        <span className='code-blue'>public class</span> <span className='code-green'>ExampleRepository</span> : <span className='code-light-green'>IExampleRepository</span><br />
                    </CodeLine2>
                    <CodeLine2>
                        &#123;
                    </CodeLine2>
                    <HtmlTooltip
                        title={
                            <React.Fragment>
                                <Typography className='code-font'>
                                    <span className='code-green'>DbContext</span>
                                </Typography>
                                <Typography sx={{ fontSize: "0.875rem" }}>
                                    Uses dependency injection to create a new DbContext instance when a new request comes in. Contains a snapshot of the current database to use for tracking changes and making database updates.
                                </Typography>
                            </React.Fragment>
                        }
                    >
                        <CodeLine3 className='code-outline'>
                            <span className='code-blue'>private readonly</span> <span className='code-green'>ExampleDbContext</span> _dbContext;
                        </CodeLine3>
                    </HtmlTooltip>
                    <CodeLine2>
                        &#125;
                    </CodeLine2>
                    <br />
                    <CodeLine2>
                        <span className='code-blue'>public async</span>&nbsp;
                        <span className='code-green'>Task</span>&lt;
                        <span className='code-green'>List</span>&lt;
                        <span className='code-blue'>string</span>&gt;&gt;&nbsp;
                        <span className='code-yellow'>GetStringsFromDB</span>
                        ()
                    </CodeLine2>
                    <CodeLine2>
                        &#123;
                    </CodeLine2>
                    <CodeLine3>
                        <span className='code-purple'>try</span>
                    </CodeLine3>
                    <CodeLine3>
                        &#123;
                    </CodeLine3>
                    <CodeLine4>
                        <span className='code-blue'>var</span>&nbsp;
                        <span className='code-light-blue'>currentDate</span>
                        <span className='code-font'>&nbsp;=&nbsp;</span>
                        <span className='code-light-green'>DateTime</span>
                        <span className='code-font'>.Today;</span>
                    </CodeLine4>
                    <CodeLine4>
                        <span className='code-blue'>var</span>&nbsp;
                        <span className='code-light-blue'>startOfMonth</span>
                        <span className='code-font'>&nbsp;=&nbsp;</span>
                        <span className='code-blue'>new</span>&nbsp;
                        <span className='code-light-green'>DateTime</span>
                        <span className='code-font'>(</span>
                        <span className='code-light-blue'>currentDate</span>
                        <span className='code-font'>.Year,&nbsp;</span>
                        <span className='code-light-blue'>currentDate</span>
                        <span className='code-font'>.Month,&nbsp;</span>
                        <span className='code-light-green'>1</span>
                        <span className='code-font'>);</span>
                    </CodeLine4>
                    <CodeLine4>
                        <span className='code-blue'>var</span>&nbsp;
                        <span className='code-light-blue'>startOfNextMonth</span>
                        <span className='code-font'>&nbsp;=&nbsp;</span>
                        <span className='code-light-blue'>startOfMonth</span>
                        <span className='code-font'>.</span>
                        <span className='code-yellow'>AddMonths</span>
                        <span className='code-font'>(</span>
                        <span className='code-light-green'>1</span>
                        <span className='code-font'>);</span>
                    </CodeLine4>
                    <br />
                    <CodeLine4>
                        <span className='code-green'>List</span>&lt;
                        <span className='code-blue'>string</span>&gt;?&nbsp;
                        <span className='code-light-blue'>stringsFromDb</span>&nbsp;=&nbsp;
                        <span className='code-blue'>await</span> _dbContext.Strings
                    </CodeLine4>
                    <CodeLine5>
                        <HtmlTooltip
                            title={
                                <React.Fragment>
                                    <Typography>
                                        .<span className='code-yellow'>AsNoTracking</span><span className='code-font'>()</span>
                                    </Typography>
                                    <Typography sx={{ fontSize: "0.875rem" }}>
                                        Tells EntityFramework that it doesn't need to track changes for this entity (slightly improves performance).
                                    </Typography>
                                </React.Fragment>
                            }
                        >
                            <span className='code-outline'>
                                <span className='code-font'>.</span>
                                <span className='code-yellow'>AsNoTracking</span>
                                <span className='code-font'>()</span>
                            </span>
                        </HtmlTooltip>
                    </CodeLine5>
                    <CodeLine5>
                        <HtmlTooltip
                            title={
                                <React.Fragment>
                                    <Typography>
                                        .<span className='code-yellow'>Where</span><span className='code-font'>()</span>
                                    </Typography>
                                    <Typography sx={{ fontSize: "0.875rem" }}>
                                        Only pulls records from the database that have been created in the current month.
                                    </Typography>
                                </React.Fragment>
                            }
                        >
                            <span className='code-font'>.</span>
                            <span className='code-yellow'>Where</span>
                            <span className='code-font'>(</span>
                            <span className='code-light-blue'>x</span>
                            <span className='code-font'>&nbsp;=&gt;&nbsp;</span>
                            <span className='code-light-blue'>x</span>
                            <span className='code-font'>.CreatedDate&nbsp;&gt;=&nbsp;</span>
                            <span className='code-light-blue'>startOfMonth</span>
                            <span className='code-font'>&nbsp;&&&nbsp;</span>
                            <span className='code-light-blue'>x</span>
                            <span className='code-font'>.CreatedDate&nbsp;&lt;&nbsp;</span>
                            <span className='code-light-blue'>startOfNextMonth</span>
                            <span className='code-font'>)</span>
                        </HtmlTooltip>
                    </CodeLine5>
                    <CodeLine5>
                        <HtmlTooltip
                            title={
                                <React.Fragment>
                                    <Typography>
                                        .<span className='code-yellow'>ToListAsync</span><span className='code-font'>()</span>
                                    </Typography>
                                    <Typography sx={{ fontSize: "0.875rem" }}>
                                        A task that returns data from the db stored in a List.
                                    </Typography>
                                </React.Fragment>
                            }
                        >
                            <span className='code-font'>.</span>
                            <span className='code-yellow'>ToListAsync</span>
                            <span className='code-font'>()</span>
                        </HtmlTooltip>
                    </CodeLine5>
                    <CodeLine5>
                        <HtmlTooltip
                            title={
                                <React.Fragment>
                                    <Typography>
                                        .<span className='code-yellow'>ConfigureAwait</span><span className='code-font'>()</span>
                                    </Typography>
                                    <Typography sx={{ fontSize: "0.875rem" }}>
                                        Instructs the task to continue its execution on a different context after the await is completed, rather than capturing and resuming on the original synchronization context.
                                    </Typography>
                                </React.Fragment>
                            }
                        >
                            <span className='code-font'>.</span>
                            <span className='code-yellow'>ConfigureAwait</span>
                            <span className='code-font'>(</span>
                            <span className='code-blue'>false</span>
                            <span className='code-font'>);</span>
                        </HtmlTooltip>
                    </CodeLine5>
                    <br />
                    <CodeLine4>
                        <span className='code-purple'>return</span>&nbsp;
                        <span className='code-light-blue'>stringsFromDb</span>;
                    </CodeLine4>
                    <CodeLine3>
                        &#125;
                    </CodeLine3>
                    <CodeLine3>
                        <span className='code-purple'>catch</span>&nbsp;(
                        <span className='code-green'>Exception</span>&nbsp;
                        <span className='code-light-blue'>ex</span>)
                    </CodeLine3>
                    <CodeLine3>
                        &#123;
                    </CodeLine3>
                    <CodeLine4>
                        <span className='code-dark-green'>// Log error</span>
                    </CodeLine4>
                    <CodeLine3>
                        &#125;
                    </CodeLine3>
                    <CodeLine2>
                        &#125;
                    </CodeLine2>
                    <CodeLine1>
                        &#125;
                    </CodeLine1>
                </CodePaper>
            </TitleBox>
        </Stack>
    );
}

export default RepositoryExample;