using alpha_labs._01.Configuration.Configs;
using alpha_labs._02.Models;
using alpha_labs._03.DataAccess.BudgetApp;
using alpha_labs._03.DataAccess.CalendarApp;
using alpha_labs._04.Services.BudgetApp;
using alpha_labs._04.Services.CalendarApp;
using alpha_labs._05.Workflows.BudgetApp;
using alpha_labs._05.Workflows.CalendarApp;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddHttpContextAccessor();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// configure strongly typed settings object
builder.Services.Configure<BudgetConfig>(builder.Configuration.GetSection("BudgetConfig"));
builder.Services.Configure<CalendarConfig>(builder.Configuration.GetSection("CalendarConfig"));
builder.Services.Configure<TodoConfig>(builder.Configuration.GetSection("TodoConfig"));

builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 62914560; // 30 MB limit (in bytes)
});

// configure DI for BUDGET APP services
builder.Services.AddScoped<IBillWorkflow, BillWorkflow>();
builder.Services.AddScoped<IDashboardWorkflow, DashboardWorkflow>();
builder.Services.AddScoped<IFundWorkflow, FundWorkflow>();
builder.Services.AddScoped<IPaycheckWorkflow, PaycheckWorkflow>();
builder.Services.AddScoped<IPurchaseWorkflow, PurchaseWorkflow>();
builder.Services.AddScoped<ITransactionWorkflow, TransactionWorkflow>();

builder.Services.AddScoped<IBillService, BillService>();
builder.Services.AddScoped<IDashboardService, DashboardService>();
builder.Services.AddScoped<IFundService, FundService>();
builder.Services.AddScoped<IPaycheckService, PaycheckService>();
builder.Services.AddScoped<IPurchaseService, PurchaseService>();
builder.Services.AddScoped<ITransactionService, TransactionService>();

builder.Services.AddScoped<IBillRepository, BillRepository>();
builder.Services.AddScoped<IFundRepository, FundRepository>();
builder.Services.AddScoped<IPaycheckRepository, PaycheckRepository>();
builder.Services.AddScoped<IPurchaseRepository, PurchaseRepository>();
builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();

// configure DI for CALENDAR APP services
builder.Services.AddScoped<IBirthdayWorkflow, BirthdayWorkflow>();
builder.Services.AddScoped<IHolidayWorkflow, HolidayWorkflow>();
builder.Services.AddScoped<IDetailsWorkflow, DetailsWorkflow>();

builder.Services.AddScoped<IBirthdayService, BirthdayService>();
builder.Services.AddScoped<IDetailsService, DetailsService>();
builder.Services.AddScoped<IHolidayService, HolidayService>();

builder.Services.AddScoped<IBirthdayRepository, BirthdayRepository>();
builder.Services.AddScoped<IHolidayRepository, HolidayRepository>();

builder.Services.AddDbContext<AlphaLabsDbContext>(options => options
    .UseSqlServer(builder.Configuration.GetConnectionString("AlphaLabsDbContext")));

var app = builder.Build();

app.UseCors(policy => policy
    .AllowAnyHeader()
    .AllowAnyMethod()
    .SetIsOriginAllowed(origin => true)
    .AllowCredentials());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
