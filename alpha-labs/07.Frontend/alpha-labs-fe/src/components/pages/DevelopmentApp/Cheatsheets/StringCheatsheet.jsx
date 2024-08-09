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

const ExampleBox = styled(Stack)(() => ({
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    paddingBottom: "24px",
    marginBottom: "24px",
    borderBottom: "1px solid rgba(40, 47, 87, 1)"
}));

const CodeBox = styled(Box)(() => ({
    display: "flex",
    alignItems: "baseline",
    marginTop: "8px",
}));

const SpacingBox = styled(Box)(() => ({
    marginTop: "3rem"
}));

const MethodName = styled(Typography)(() => ({
    color: "#cccccc",
}));


const StringCheatsheet = () => {

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
                    Cheatsheet <span className='code-font code-padup'>[string]</span>
                </Typography>
            </TitleBox>
            <SheetPaper>
                <Stack>
                    <SectionHeader className='dev-h3'>
                        <span className='code-font'>[string]</span> Class Methods
                    </SectionHeader>
                    {/* <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            mt: 1.5,
                            mb: 3
                        }}
                    >
                        <Typography>
                            String used in the following examples:&nbsp;&nbsp;<code className='code-ex'>string text = "This is a test string.";</code>
                        </Typography>
                    </Box> */}
                    <ExampleBox>
                        <MethodName>
                            <span className='dev-methodname'>Clone():</span> creates a copy of the string variable and points it to the same instance (NOT deep copy)
                        </MethodName>
                        <Typography className='code-font'>
                            Output: <span className='dev-params'>string</span>
                        </Typography>
                        <Typography className='code-font'>
                            Params: <span className='dev-params'>[none]</span>
                        </Typography>
                        <Typography className='code-font'>
                            <pre className='code-ex'>
                                string text = "This is a test string.";<br />
                            </pre>
                        </Typography>
                        <CodeBox>
                            <Typography className='code-font'>
                                <code className='code-text'>string clone = text.Clone();</code>
                            </Typography>
                            <Typography className='code-desc'>
                                clone = This is a test string.
                            </Typography>
                        </CodeBox>
                    </ExampleBox>
                    <ExampleBox>
                        <MethodName>
                            <span className='dev-methodname'>Compare():</span> compares two strings and returns an int that indicates their position in the sort order.
                        </MethodName>
                        <Typography className='code-font'>
                            Output: <span className='dev-params'>int</span>
                        </Typography>
                        <Typography className='code-font'>
                            Params: <span className='dev-params'>[string textValue1, string textValue2]</span>
                        </Typography>
                        <Typography className='code-font'>
                            <pre className='code-ex'>
                                string text1 = "This is a test string.";<br />
                                string text2 = "This is not a test string.";
                            </pre>
                        </Typography>
                        <CodeBox>
                            <Typography className='code-font'>
                                <pre className='code-text'>int result = string.Compare(text1, text2);</pre>
                            </Typography>
                            <Typography className='code-desc'>
                                result = -1
                            </Typography>
                        </CodeBox>
                    </ExampleBox>
                    <ExampleBox>
                        <MethodName>
                            <span className='dev-methodname'>CompareTo():</span> compares two strings and returns an int that indicates their position in the sort order.
                        </MethodName>
                        <Typography className='code-font'>
                            Output: <span className='dev-params'>int</span>
                        </Typography>
                        <Typography className='code-font'>
                            Params: <span className='dev-params'>[string textValue2]</span>
                        </Typography>
                        <Typography className='code-font'>
                            <pre className='code-ex'>
                                string text1 = "This is a test string.";<br />
                                string text2 = "This is not a test string.";
                            </pre>
                        </Typography>
                        <CodeBox>
                            <Typography className='code-font'>
                                <code className='code-text'>int result = text1.CompareTo(text2);</code>
                            </Typography>
                            <Typography className='code-desc'>
                                result = -1
                            </Typography>
                        </CodeBox>
                    </ExampleBox>
                    <ExampleBox>
                        <MethodName>
                            <span className='dev-methodname'>Concat():</span> concatenates one or more strings into a single string.
                        </MethodName>
                        <Typography className='code-font'>
                            Output: <span className='dev-params'>string</span>
                        </Typography>
                        <Typography className='code-font'>
                            Params: <span className='dev-params'>[string text1, string spacer, string text2]</span>
                        </Typography>
                        <Typography className='code-font'>
                            <pre className='code-ex'>
                                string text1 = "This is part one,";<br />
                                string spacer = " ";<br />
                                string text2 = "this is part two.";
                            </pre>
                        </Typography>
                        <CodeBox>
                            <Typography className='code-font'>
                                <code className='code-text'>string concatString = string.Concat(text1, spacer, text2);</code>
                            </Typography>
                            <Typography className='code-desc'>
                                concatString = This is part one, this is part two.
                            </Typography>
                        </CodeBox>
                    </ExampleBox>
                    <ExampleBox>
                        <MethodName>
                            <span className='dev-methodname'>Contains():</span> returns a boolean indicating whether a specified substring occurs within another string.
                        </MethodName>
                        <Typography className='code-font'>
                            Output: <span className='dev-params'>bool</span>
                        </Typography>
                        <Typography className='code-font'>
                            Params: <span className='dev-params'>[string word]</span>
                        </Typography>
                        <Typography className='code-font'>
                            <pre className='code-ex'>
                                string sentence = "This is a test sentence.";<br />
                                string word = "test";
                            </pre>
                        </Typography>
                        <CodeBox>
                            <Typography className='code-font'>
                                <code className='code-text'>bool containsValue = sentence.Contains(word);</code>
                            </Typography>
                            <Typography className='code-desc'>
                                containsValue = true
                            </Typography>
                        </CodeBox>
                    </ExampleBox>
                    <ExampleBox>
                        <MethodName>
                            <span className='dev-methodname'>Copy():</span> creates a new instance of a string with the same value.
                        </MethodName>
                        <Typography className='code-font'>
                            Output: <span className='dev-params'>string</span>
                        </Typography>
                        <Typography className='code-font'>
                            Params: <span className='dev-params'>[string text]</span>
                        </Typography>
                        <Typography className='code-font'>
                            <pre className='code-ex'>
                                string text = "This is a test sentence.";<br />
                            </pre>
                        </Typography>
                        <CodeBox>
                            <Typography>
                                <code className='code-text'>string copiedString = string.Copy(text);</code>
                            </Typography>
                            <Typography className='code-desc'>
                                copiedString = This is a test sentence.
                            </Typography>
                        </CodeBox>
                    </ExampleBox>
                    <ExampleBox>
                        <MethodName>
                            <span className='dev-methodname'>Equals():</span> determines whether <b>this</b> string is equivalent to another string.
                        </MethodName>
                        <Typography className='code-font'>
                            Output: <span className='dev-params'>bool</span>
                        </Typography>
                        <Typography className='code-font'>
                            Params: <span className='dev-params'>[string text2]</span>
                        </Typography>
                        <Typography className='code-font'>
                            <pre className='code-ex'>
                                string text1 = "This is a test sentence.";<br />
                                string text2 = "A different sentence this is.";
                            </pre>
                        </Typography>
                        <CodeBox>
                            <Typography>
                                <code className='code-text'>bool areEqual = text1.Equals(text2);</code>
                            </Typography>
                            <Typography className='code-desc'>
                                areEqual = false
                            </Typography>
                        </CodeBox>
                    </ExampleBox>
                    <ExampleBox>
                        <MethodName>
                            <span className='dev-methodname'>Format():</span> replaces &#123;placeholders&#125; with arguments passed in (# of args must match # of placeholders).
                        </MethodName>
                        <Typography className='code-font'>
                            Output: <span className='dev-params'>string</span>
                        </Typography>
                        <Typography className='code-font'>
                            Params: <span className='dev-params'>[none]</span>
                        </Typography>
                        <Typography>
                            <code className='code-text'>string formattedString = string.Format("Placeholder 1: &#123;1&#125;, Placeholder 2: &#123;2&#125;", "Value1", 2);</code>
                        </Typography>
                        <Typography className='code-desc'>
                            formattedString = Placeholder 1: Value1, Placeholder 2: 2
                        </Typography>
                    </ExampleBox>
                    <ExampleBox>
                        <MethodName>
                            <span className='dev-methodname'>IndexOf():</span>  reports the zero-based index of the first occurrence of a specified Unicode character or string within this instance.
                        </MethodName>
                        <Typography className='code-font'>
                            Output: <span className='dev-params'>int</span>
                        </Typography>
                        <Typography className='code-font'>
                            Params: <span className='dev-params'>[string word]</span>
                        </Typography>
                        <Typography className='code-font'>
                            <pre className='code-ex'>
                                string text1 = "This is a test sentence.";<br />
                                string word = "test";
                            </pre>
                        </Typography>
                        <CodeBox>
                            <Typography>
                                <code className='code-text'>int index = text.IndexOf(word);</code>
                            </Typography>
                            <Typography className='code-desc'>
                                index = 10 (index of the first char)
                            </Typography>
                        </CodeBox>
                    </ExampleBox>
                    <ExampleBox>
                        <MethodName>
                            <span className='dev-methodname'>IndexOfAny():</span> reports the zero-based index of the first occurrence in this instance of any character in a specified array of Unicode characters.
                        </MethodName>
                        <Typography className='code-font'>
                            Output: <span className='dev-params'>int</span>
                        </Typography>
                        <Typography className='code-font'>
                            Params: <span className='dev-params'>[char[] charArray]</span>
                        </Typography>
                        <Typography className='code-font'>
                            <pre className='code-ex'>
                                string text1 = "This is a test sentence.";<br />
                                char[] charArray = new char[] &#123; 'h', 's', '.' &#125;;
                            </pre>
                        </Typography>
                        <CodeBox>
                            <Typography>
                                <code className='code-text'>int index = text.IndexOfAny(charArray);</code>
                            </Typography>
                            <Typography className='code-desc'>
                                index = 1 (index of 'h')
                            </Typography>
                        </CodeBox>
                    </ExampleBox>
                    <ExampleBox>
                        <MethodName>
                            <span className='dev-methodname'>Insert():</span> returns a new string in which a specified string is inserted at a specified index position in this instance.
                        </MethodName>
                        <Typography className='code-font'>
                            Output: <span className='dev-params'>string</span>
                        </Typography>
                        <Typography className='code-font'>
                            Params: <span className='dev-params'>[int startIndex, string insert]</span>
                        </Typography>
                        <Typography className='code-font'>
                            <pre className='code-ex'>
                                string text1 = "This is a test sentence.";<br />
                                string insert = "new ";
                            </pre>
                        </Typography>
                        <CodeBox>
                            <Typography>
                                <code className='code-text'>string newString = text.Insert(9, insert);</code>                                
                            </Typography>
                            <Typography className='code-desc'>
                                newString = "This is a new test sentence."
                            </Typography>
                        </CodeBox>
                    </ExampleBox>
                    <ExampleBox>
                        <MethodName>
                            <span className='dev-methodname'>IsNullOrEmpty():</span> indicates whether the specified string is null or an empty string.
                        </MethodName>
                        <Typography className='code-font'>
                            Output: <span className='dev-params'>bool</span>
                        </Typography>
                        <Typography className='code-font'>
                            Params: <span className='dev-params'>[string text]</span>
                        </Typography>
                        <Typography className='code-font'>
                            <pre className='code-ex'>
                                string text = "This is a test sentence.";<br />
                            </pre>
                        </Typography>
                        <CodeBox>
                            <Typography>
                                <code className='code-text'>bool isNullOrEmpty = string.IsNullOrEmpty(text);</code>                                
                            </Typography>
                            <Typography className='code-desc'>
                                isNullOrEmpty = false
                            </Typography>
                        </CodeBox>
                    </ExampleBox>
                    <ExampleBox>
                        <MethodName>
                            <span className='dev-methodname'>IsNullOrWhiteSpace():</span> indicates whether a specified string is null, empty, or consists only of white-space characters.
                        </MethodName>
                        <Typography className='code-font'>
                            Output: <span className='dev-params'>bool</span>
                        </Typography>
                        <Typography className='code-font'>
                            Params: <span className='dev-params'>[string text]</span>
                        </Typography>
                        <Typography className='code-font'>
                            <pre className='code-ex'>
                                string text = "&nbsp;&nbsp;&nbsp;";<br />
                            </pre>
                        </Typography>
                        <CodeBox>
                            <Typography>
                                <code className='code-text'>bool isNullOrWhiteSpace = string.IsNullOrWhiteSpace(text);</code>                                
                            </Typography>
                            <Typography className='code-desc'>
                                isNullOrWhiteSpace = true
                            </Typography>
                        </CodeBox>
                    </ExampleBox>
                    <ExampleBox>
                        <MethodName>
                            <span className='dev-methodname'>Join():</span> concatenates the elements of a specified array or the members of a collection, using the specified separator between each element or member.
                        </MethodName>
                        <Typography className='code-font'>
                            Output: <span className='dev-params'>string</span>
                        </Typography>
                        <Typography className='code-font'>
                            Params: <span className='dev-params'>[char separator, string[] stringArray]</span>
                        </Typography>
                        <Typography className='code-font'>
                            <pre className='code-ex'>
                                string[] stringArray = new string[] &#123; "Hello", "World!" &#125;;<br />
                                char separator = ' ';
                            </pre>
                        </Typography>
                        <CodeBox>
                            <Typography>
                                <code className='code-text'>string joinedString = string.Join(separator, stringArray);</code>                                
                            </Typography>
                            <Typography className='code-desc'>
                                joinedString = Hello World!
                            </Typography>
                        </CodeBox>
                    </ExampleBox>
                    <ExampleBox>
                        <MethodName>
                            <span className='dev-methodname'>Replace():</span> returns a new string in which all occurrences of a specified string in the current instance are replaced with another specified string.
                        </MethodName>
                        <Typography className='code-font'>
                            Output: <span className='dev-params'>string</span>
                        </Typography>
                        <Typography className='code-font'>
                            Params: <span className='dev-params'>[string value1, string value2]</span>
                        </Typography>
                        <Typography className='code-font'>
                            <pre className='code-ex'>
                                string text = "This is a test sentence.";<br />
                            </pre>
                        </Typography>
                        <CodeBox>
                            <Typography>
                                <code className="code-text">string replacedStr = text.Replace("test", "replaced");</code>                                
                            </Typography>
                            <Typography className='code-desc'>
                                replacedStr = This is a replaced string.
                            </Typography>
                        </CodeBox>
                    </ExampleBox>
                    <ExampleBox>
                        <MethodName>
                            <span className='dev-methodname'>Split():</span> returns a string array that contains the substrings in this instance that are delimited by elements of a specified Unicode character array.
                        </MethodName>
                        <Typography className='code-font'>
                            Output: <span className='dev-params'>string[]</span>
                        </Typography>
                        <Typography className='code-font'>
                            Params: <span className='dev-params'>[char separator]</span>
                        </Typography>
                        <Typography className='code-font'>
                            <pre className='code-ex'>
                                string text = "This is a test sentence.";<br />
                                char separator = ' ';
                            </pre>
                        </Typography>
                        <CodeBox>
                            <Typography>
                                <code className="code-text">string[] words = text.Split(separator);</code>
                            </Typography>
                            <Typography className='code-desc'>
                                words = [ This, is, a, test, sentence. ]
                            </Typography>
                        </CodeBox>
                    </ExampleBox>
                    <ExampleBox>
                        <MethodName>
                            <span className='dev-methodname'>StartsWith():</span> determines whether the beginning of this string instance matches the specified string.
                        </MethodName>
                        <Typography className='code-font'>
                            Output: <span className='dev-params'>true</span>
                        </Typography>
                        <Typography className='code-font'>
                            Params: <span className='dev-params'>[string startsWithText]</span>
                        </Typography>
                        <Typography className='code-font'>
                            <pre className='code-ex'>
                                string filename = "document.txt";<br />
                            </pre>
                        </Typography>
                        <CodeBox>
                            <Typography>
                                <code className="code-text">bool startsWithDoc = filename.StartsWith("doc");</code>                                
                            </Typography>
                            <Typography className='code-desc'>
                                startsWithDoc = true
                            </Typography>
                        </CodeBox>
                    </ExampleBox>
                    <ExampleBox>
                        <MethodName>
                            <span className='dev-methodname'>Substring():</span> retrieves a substring from this instance. The substring starts at a specified character position and has a specified length.
                        </MethodName>
                        <Typography className='code-font'>
                            Output: <span className='dev-params'>string</span>
                        </Typography>
                        <Typography className='code-font'>
                            Params: <span className='dev-params'>[int startIndex, int endIndex]</span>
                        </Typography>
                        <Typography className='code-font'>
                            <pre className='code-ex'>
                                string text = "This is a test sentence.";<br />
                            </pre>
                        </Typography>
                        <CodeBox>
                            <Typography>
                                <code className="code-text">string subtext = text.Substring(0, 6);</code>                                
                            </Typography>
                            <Typography className='code-desc'>
                                subtext = This i
                            </Typography>
                        </CodeBox>
                    </ExampleBox>
                    <ExampleBox>
                        <MethodName>
                            <span className='dev-methodname'>ToLower():</span> returns a copy of this string converted to lowercase.
                        </MethodName>
                        <Typography className='code-font'>
                            Output: <span className='dev-params'>string</span>
                        </Typography>
                        <Typography className='code-font'>
                            Params: <span className='dev-params'>[none]</span>
                        </Typography>
                        <Typography className='code-font'>
                            <pre className='code-ex'>
                                string text = "This is a Test Sentence.";<br />
                            </pre>
                        </Typography>
                        <CodeBox>
                            <Typography>
                                <code className="code-text">string lowerText = text.ToLower();</code>                                
                            </Typography>
                            <Typography className='code-desc'>
                                lowerText = this is a test sentence.
                            </Typography>
                        </CodeBox>
                    </ExampleBox>
                    <ExampleBox>
                        <MethodName>
                            <span className='dev-methodname'>ToUpper():</span> returns a copy of this string converted to uppercase.
                        </MethodName>
                        <Typography className='code-font'>
                            Output: <span className='dev-params'>string</span>
                        </Typography>
                        <Typography className='code-font'>
                            Params: <span className='dev-params'>[none]</span>
                        </Typography>
                        <Typography className='code-font'>
                            <pre className='code-ex'>
                                string text = "This is a Test Sentence.";<br />
                            </pre>
                        </Typography>
                        <CodeBox>
                            <Typography>
                                <code className="code-text">string upperText = text.ToUpper();</code>                                
                            </Typography>
                            <Typography className='code-desc'>
                                upperText = THIS IS A TEST SENTENCE.
                            </Typography>
                        </CodeBox>
                    </ExampleBox>
                    <ExampleBox>
                        <MethodName>
                            <span className='dev-methodname'>Trim():</span> removes all leading and trailing white-space characters from the current string.
                        </MethodName>
                        <Typography className='code-font'>
                            Output: <span className='dev-params'>string</span>
                        </Typography>
                        <Typography className='code-font'>
                            Params: <span className='dev-params'>[none]</span>
                        </Typography>
                        <Typography className='code-font'>
                            <pre className='code-ex'>
                                string text = "&nbsp;&nbsp;&nbsp;Hello World!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";<br />
                            </pre>
                        </Typography>
                        <CodeBox>
                            <Typography>
                                <code className="code-text">string trimmedText = text.Trim();</code>                                
                            </Typography>
                            <Typography className='code-desc'>
                                trimmedText = Hello World!
                            </Typography>
                        </CodeBox>
                    </ExampleBox>
                    <ExampleBox>
                        <MethodName>
                            <span className='dev-methodname'>TrimEnd():</span> removes all trailing occurrences of a set of specified characters from the current string.
                        </MethodName>
                        <Typography className='code-font'>
                            Output: <span className='dev-params'>string</span>
                        </Typography>
                        <Typography className='code-font'>
                            Params: <span className='dev-params'>[char charToTrim...]</span>
                        </Typography>
                        <Typography className='code-font'>
                            <pre className='code-ex'>
                                string text = "Hello World!!!!!.";<br />
                            </pre>
                        </Typography>
                        <CodeBox>
                            <Typography>
                                <code className="code-text">string trimmedText = text.TrimEnd('!', '.');</code>    
                            </Typography>
                            <Typography className='code-desc'>
                                trimmedText = Hello World
                            </Typography>
                        </CodeBox>
                    </ExampleBox>
                    <ExampleBox>
                        <MethodName>
                            <span className='dev-methodname'>TrimStart():</span> removes all leading occurrences of a set of specified characters from the current string.
                        </MethodName>
                        <Typography className='code-font'>
                            Output: <span className='dev-params'>string</span>
                        </Typography>
                        <Typography className='code-font'>
                            Params: <span className='dev-params'>[char charToTrim...]</span>
                        </Typography>
                        <Typography className='code-font'>
                            <pre className='code-ex'>
                                string text = "***Hello World!";<br />
                            </pre>
                        </Typography>
                        <CodeBox>
                            <Typography>
                                <code className="code-text">string trimmedText = text.TrimStart('*');</code>
                            </Typography>
                            <Typography className='code-desc'>
                                trimmedText = Hello World!
                            </Typography>
                        </CodeBox>
                    </ExampleBox>
                    <ExampleBox>
                        <MethodName>
                            <span className='dev-methodname'>Normalize():</span> returns a new string whose textual value is the same as this string, but whose binary representation is in a particular Unicode normalization form.
                        </MethodName>
                        <Typography className='code-font'>
                            Output: <span className='dev-params'>string</span>
                        </Typography>
                        <Typography className='code-font'>
                            Params: <span className='dev-params'>[ ]</span>
                        </Typography>
                        <Typography className='code-font'>
                            <pre className='code-ex'>
                                string text = "This is a tést string.";<br />
                            </pre>
                        </Typography>
                        <CodeBox>
                            <Typography>
                                <code className="code-text">string normalized = text.Normalize(NormalizationForm.FormD);</code>                                
                            </Typography>
                            <Typography className='code-desc'>
                                normalized = This is a tést string. (é decomposed form)
                            </Typography>
                        </CodeBox>
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

export default StringCheatsheet;