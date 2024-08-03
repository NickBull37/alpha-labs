import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import { Header } from "./components";
import { LabDashboard, BudgetLanding, BudgetDashboard, Purchases, PurchaseHistory, Bills, BillingHistory, Savings, DepositFunds } from "./components";
import { CalendarLanding, CalendarList, DayDetails } from "./components";
import { DevLanding, FontShowcase } from "./components";
import { PhotoLanding } from "./components";
import { TodoLanding, TodoList } from "./components";
import { WeatherLanding } from "./components";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LabDashboard />} />
                <Route path="/budget-landing" element={<BudgetLanding />} />
                <Route path="/budget-dashboard" element={<BudgetDashboard />} />
                <Route path="/budget-bills" element={<Bills />} />
                <Route path="/budget-billing-history" element={<BillingHistory />} />
                <Route path="/budget-purchases" element={<Purchases />} />
                <Route path="/budget-purchase-history" element={<PurchaseHistory />} />
                <Route path="/budget-savings" element={<Savings />} />
                <Route path="/budget-deposit" element={<DepositFunds />} />

                <Route path="/calendar-landing" element={<CalendarLanding />} />
                <Route path="/calendar-list" element={<CalendarList />} />
                <Route path="/details" element={<DayDetails />} />

                <Route path="/dev-landing" element={<DevLanding />} />

                <Route path="/dev-fonts" element={<FontShowcase />} />

                <Route path="/photo-landing" element={<PhotoLanding />} />

                <Route path="/todo-landing" element={<TodoLanding />} />
                <Route path="/todo-list" element={<TodoList />} />

                <Route path="/weather-landing" element={<WeatherLanding />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
