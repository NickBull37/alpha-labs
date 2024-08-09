import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Stack, Paper, Typography, } from '@mui/material';
import { Navbar } from '../../../../components';
import ApiIcon from '@mui/icons-material/Api';

const TitleBox = styled(Box)(() => ({
    marginBottom: 8,
    marginTop: 128,
    marginRight: "18%",
    marginLeft: "18%",
}));

const SheetPaper = styled(Paper)(() => ({
    backgroundColor: '#4d4d4d',
    boxShadow: "0px 2px 10px 1px #1a1a1a",
    padding: "24px 20px",
    color: "#fff",
    marginBottom: 72,
    marginRight: "17%",
    marginLeft: "17%"
}));

const SectionHeader = styled(Typography)(() => ({
    borderBottom: '1px solid #1BFFE9',
    marginBottom: "1rem",
}));

const ExampleBox = styled(Box)(() => ({
    display: "flex",
    alignItems: "baseline",
    marginBottom: "0.75rem"
}));

const SpacingBox = styled(Box)(() => ({
    marginTop: "3rem"
}));



const ListCheatsheet = () => {

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
                    Cheatsheet <span className='code-font code-padup'>[List]</span>
                </Typography>
            </TitleBox>
            <SheetPaper>
                <Stack>
                    <SectionHeader className='dev-h3'>
                        Declaring & Initializing Lists
                    </SectionHeader>
                    <ExampleBox>
                        <Typography>
                            <code className='code-text'>List&lt;int&gt; numbers = [];</code>
                        </Typography>
                        <Typography className='code-desc'>
                            - creates an empty list of ints
                        </Typography>
                    </ExampleBox>
                    <ExampleBox>
                        <Typography>
                            <code className='code-text'>List&lt;int&gt; numbers = new(10);</code>
                        </Typography>
                        <Typography className='code-desc'>
                            - create list with specified size
                        </Typography>
                    </ExampleBox>
                    <ExampleBox>
                        <Typography>
                            <code className='code-text'>List&lt;int&gt; numbers = [3, 14, 59];</code>
                        </Typography>
                        <Typography className='code-desc'>
                            - declare list and initialize values
                        </Typography>
                    </ExampleBox>
                    <SpacingBox>
                        <br />
                    </SpacingBox>
                    <SectionHeader className='dev-h3'>
                        List Methods & Props
                    </SectionHeader>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            mt: 1.5,
                            mb: 3
                        }}
                    >
                        <Typography>
                            List used in the following examples:&nbsp;&nbsp;<code className='code-ex'>List&lt;int&gt; numbers = [3, 14, 59];</code>
                        </Typography>
                    </Box>
                    <ExampleBox>
                        <Typography className='code-font'>
                            Capacity: <code className='code-text'>int capacity = numbers.Capacity;</code>
                        </Typography>
                        <Typography className='code-desc'>
                            capacity = 3
                        </Typography>
                    </ExampleBox>
                    <ExampleBox>
                        <Typography className='code-font'>
                            Count: <code className='code-text'>int count = numbers.Count;</code>
                        </Typography>
                        <Typography className='code-desc'>
                            count = 3
                        </Typography>
                    </ExampleBox>
                    <ExampleBox>
                        <Typography className='code-font'>
                            Add: <code className='code-text'>numbers.Add(42);</code>
                        </Typography>
                        <Typography className='code-desc'>
                            adds 42 to numbers list
                        </Typography>
                    </ExampleBox>
                    <ExampleBox>
                        <Typography className='code-font'>
                            Contains(): <code className='code-text'>bool hasValue = numbers.Contains(14);</code>
                        </Typography>
                        <Typography className='code-desc'>
                            hasValue = true
                        </Typography>
                    </ExampleBox>
                    <ExampleBox>
                        <Typography className='code-font'>
                            ElementAt(): <code className='code-text'>int element = numbers.ElementAt(0);</code>
                        </Typography>
                        <Typography className='code-desc'>
                            element = 3 (throws exception if index out of bounds)
                        </Typography>
                    </ExampleBox>
                    <ExampleBox>
                        <Typography className='code-font'>
                            ElementAtOrDefault(): <code className='code-text'>int element = numbers.ElementAtOrDefault(1);</code>
                        </Typography>
                        <Typography className='code-desc'>
                            element = 14
                        </Typography>
                    </ExampleBox>
                    <ExampleBox>
                        <Typography className='code-font'>
                            Exists(): <code className='code-text'>bool numExists = numbers.Exists(number =&gt; number == 14);</code>
                        </Typography>
                        <Typography className='code-desc'>
                            numExists = true
                        </Typography>
                    </ExampleBox>
                    <ExampleBox>
                        <Typography className='code-font'>
                            Find(): <code className='code-text'>int number = numbers.Find(number =&gt; number == 14);</code>
                        </Typography>
                        <Typography className='code-desc'>
                            number = 14
                        </Typography>
                    </ExampleBox>
                    <ExampleBox>
                        <Typography className='code-font'>
                            FindAll(): <code className='code-text'>List&lt;int&gt; numberList = numbers.Find(number =&gt; number &gt; 5);</code>
                        </Typography>
                        <Typography className='code-desc'>
                            numbers = [ 14, 59 ]
                        </Typography>
                    </ExampleBox>
                    <ExampleBox>
                        <Typography className='code-font'>
                            Max(): <code className='code-text'>int max = numbers.Max();</code>
                        </Typography>
                        <Typography className='code-desc'>
                            max = 59
                        </Typography>
                    </ExampleBox>
                    <ExampleBox>
                        <Typography className='code-font'>
                            Min(): <code className='code-text'>int min = numbers.Min();</code>
                        </Typography>
                        <Typography className='code-desc'>
                            min = 3
                        </Typography>
                    </ExampleBox>
                    <ExampleBox>
                        <Typography className='code-font'>
                            Sum(): <code className='code-text'>int sum = numbers.Sum();</code>
                        </Typography>
                        <Typography className='code-desc'>
                            sum = 76
                        </Typography>
                    </ExampleBox>
                    <ExampleBox>
                        <Typography className="code-font">
                            ToArray(): <code className="code-text">int[] array = numbers.ToArray();</code>
                        </Typography>
                        <Typography className='code-desc'>
                            array = [ 3, 14, 59 ]
                        </Typography>
                    </ExampleBox>
                    <SpacingBox>
                        <br />
                    </SpacingBox>
                    <SectionHeader className='dev-h3'>
                        Lists with LINQ
                    </SectionHeader>
                    <Box
                        display="flex"
                        alignItems="center"
                        gap={2}
                        sx={{ mt: 1, mb: 3 }}
                    >
                        <Typography className="code-ex">
                            public class Car<br />
                            &#123;<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;public string Make &#123; get; set; &#125;<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;public string Model &#123; get; set; &#125;<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;public int Year &#123; get; set; &#125;<br />
                            &#125;
                        </Typography>
                        <Typography className="code-ex">
                            List&lt;Car&gt; carList =<br />
                            [<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;new Car() &#123; Make = "Chevy", Model = "Corvette", Year = 2016 &#125;<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;new Car() &#123; Make = "Dodge", Model = "Charger", Year = 2022 &#125;<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;new Car() &#123; Make = "Ford", Model = "Mustang", Year = 2014 &#125;<br />
                            ];
                        </Typography>
                    </Box>
                    <ExampleBox sx={{ mt: 1.5 }}>
                        <Typography className='dev-h3' sx={{ color: "rgba(27, 255, 233, 0.6)" }}>
                            <span className='code-h3'>Where()</span> - used to filter data sets
                        </Typography>
                    </ExampleBox>
                    <ExampleBox>
                        <Typography>
                            1. Select all elements of the list that match a specified condition.
                        </Typography>
                        <Typography className='code-desc'>
                            (Select all cars made after 2015)
                        </Typography>
                    </ExampleBox>
                    <ExampleBox>
                        <Typography className="code-font">
                            <code className="code-text">List&lt;Car&gt; newCars = cars.Where(car =&gt; car.Year &gt; 2015).ToArray();</code>
                        </Typography>
                    </ExampleBox>
                    <ExampleBox sx={{ mt: 5 }}>
                        <Typography className='dev-h3' sx={{ color: "rgba(27, 255, 233, 0.6)" }}>
                            <span className='code-h3'>Select()</span> - projects elements into new collection
                        </Typography>
                    </ExampleBox>
                    <ExampleBox>
                        <Typography>
                            1. Extract all values for a specified property from the list.
                        </Typography>
                        <Typography className='code-desc'>
                            (Select all manufacturers)
                        </Typography>
                    </ExampleBox>
                    <ExampleBox>
                        <Typography className="code-font">
                            <code className="code-text">string[] manufacturers = cars.Select(car =&gt; car.Make).ToList();</code>
                        </Typography>
                    </ExampleBox>
                    <ExampleBox sx={{ mt: 1.5 }}>
                        <Typography>
                            2. Transform data into a new object.
                        </Typography>
                        <Typography className='code-desc'>
                            (CarInfo with only Make and Year props)
                        </Typography>
                    </ExampleBox>
                    <ExampleBox>
                        <Typography className="code-font">
                            <code className="code-text">CarInfo[] infoList = cars.Select(car =&gt; new CarInfo &#123; Make = car.Make, Year = car.Year &#125;).ToList();</code>
                        </Typography>
                    </ExampleBox>
                    <ExampleBox sx={{ mt: 5 }}>
                        <Typography className='dev-h3' sx={{ color: "rgba(27, 255, 233, 0.6)" }}>
                            <span className='code-h3'>OrderBy()</span> & <span className='code-h3'>OrderByDescending()</span>
                        </Typography>
                    </ExampleBox>
                    <ExampleBox>
                        <Typography>
                            1. Order the elements in the list by a specified property in <b>ascending</b> order.
                        </Typography>
                        <Typography className='code-desc'>
                            (order by Year ASC)
                        </Typography>
                    </ExampleBox>
                    <ExampleBox>
                        <Typography className="code-font">
                            <code className="code-text">List&lt;Car&gt; orderedCars = cars.OrderBy(car =&gt; car.Year).ToList();</code>
                        </Typography>
                    </ExampleBox>
                    <ExampleBox sx={{ mt: 1.5 }}>
                        <Typography>
                            2. Order the elements in the list by a specified property in <b>descending</b> order.
                        </Typography>
                        <Typography className='code-desc'>
                            (order by Make DESC)
                        </Typography>
                    </ExampleBox>
                    <ExampleBox>
                        <Typography className="code-font">
                            <code className="code-text">List&lt;Car&gt; orderedCars = cars.OrderByDescending(car =&gt; car.Make).ToList();</code>
                        </Typography>
                    </ExampleBox>
                    <ExampleBox sx={{ mt: 5 }}>
                        <Typography className='dev-h3' sx={{ color: "rgba(27, 255, 233, 0.6)" }}>
                            <span className='code-h3'>Distinct()</span> - with custom class
                        </Typography>
                    </ExampleBox>
                    <ExampleBox>
                        <Typography>
                            1. When working with custom classes, Distinct() requires an equality comparer to determine if two objects are equal.
                        </Typography>
                    </ExampleBox>
                    <ExampleBox>
                        <Typography className="code-font">
                            <pre className="code-text">
                                List&lt;Car&gt; distinctCars = cars.Distinct(new CarComparer());<br />
                                <br />
                                public class CarComparer : IEqualityComparer&lt;Car&gt;<br />
                                &#123;<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;public bool Equals(Car x, Car y)<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&#123;<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return x.Make == y.Make && x.Model == y.Model && x.Year == y.Year;<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
                                <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;public int GetHashCode(Car car)<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&#123;<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return car.Make.GetHashCode() ^ car.Model.GetHasCode() ^ car.Year.GetHashCode();<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
                                &#125;<br />
                            </pre>
                        </Typography>
                    </ExampleBox>
                </Stack>
            </SheetPaper>
        </Stack>
    );
}

export default ListCheatsheet;