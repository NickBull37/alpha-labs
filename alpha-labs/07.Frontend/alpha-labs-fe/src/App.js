import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import { Header } from "./components";
import { LabDashboard, BudgetLanding, BudgetDashboard, Purchases, Bills, Savings, DepositFunds } from "./components";
import { CalendarLanding, CalendarList, DayDetails } from "./components";
import { PhotoLanding } from "./components";
import { TodoLanding } from "./components";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LabDashboard />} />
                <Route path="/budget-landing" element={<BudgetLanding />} />
                <Route path="/budget-dashboard" element={<BudgetDashboard />} />
                <Route path="/budget-bills" element={<Bills />} />
                <Route path="/budget-purchases" element={<Purchases />} />
                <Route path="/budget-savings" element={<Savings />} />
                <Route path="/budget-deposit" element={<DepositFunds />} />

                <Route path="/calendar-landing" element={<CalendarLanding />} />
                <Route path="/calendar-list" element={<CalendarList />} />
                <Route path="/details" element={<DayDetails />} />

                <Route path="/photo-landing" element={<PhotoLanding />} />

                <Route path="/todo-landing" element={<TodoLanding />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
