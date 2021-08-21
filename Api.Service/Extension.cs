using Api.Data;
using Api.Service.Implementations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Api.Service
{
    public static class Extension
    {
        public static IServiceCollection AddXManagementDbContext(this IServiceCollection services, string connectionString)
        {
            return services.AddDbContext<XManagementContext>(opts =>
            {
                opts.UseSqlServer(connectionString, sql =>
                {
                    sql.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery);
                });
                opts.ConfigureWarnings(w =>
                {
                    w.Throw(RelationalEventId.MultipleCollectionIncludeWarning);
                    w.Ignore(CoreEventId.RowLimitingOperationWithoutOrderByWarning);
                });
            });
        }

        public static IServiceCollection AddXManagementServices(this IServiceCollection services)
        {
            services.AddTransient<IProductService, ProductService>();
            
            return services;
        }
    }
}
