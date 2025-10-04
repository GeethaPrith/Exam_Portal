using ExamPortal.WebApi.Extensions;
using Swashbuckle.AspNetCore.SwaggerGen;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDataAccess(builder.Configuration);
builder.Services.AddServices();

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()   // 🌍 allow all domains
              .AllowAnyMethod()   // ✅ GET, POST, PUT, DELETE, etc.
              .AllowAnyHeader();  // ✅ custom headers
    });
});
builder.Services.AddControllers().AddNewtonsoftJson(); ;
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("Admin", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Admin APIs",
        Version = "v1"
    });

    options.SwaggerDoc("Student", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Student APIs",
        Version = "v1"
    });


    options.DocInclusionPredicate((docName, apiDesc) =>
    {
        if (!apiDesc.TryGetMethodInfo(out var methodInfo))
            return false;

        var groupName = apiDesc.GroupName ?? "default";
        return docName == groupName;
    });

    // Group by [Tags("...")] in UI
    options.TagActionsBy(api =>
    {
        var controllerActionDescriptor = api.ActionDescriptor as Microsoft.AspNetCore.Mvc.Controllers.ControllerActionDescriptor;
        return new[] { controllerActionDescriptor?.ControllerName };
    });


});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/Admin/swagger.json", "Admin APIs");
        options.SwaggerEndpoint("/swagger/Student/swagger.json", "Student APIs");
        options.RoutePrefix = "swagger";
    });
}

//app.UseHttpsRedirection();
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();
app.Run();

