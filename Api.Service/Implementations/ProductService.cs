using Api.Data;
using Api.Data.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Api.Service.Implementations
{
    public class ProductService : IProductService
    {
        protected string[] DefaultIncludes => new string[]
        {
            "Brand",
            "Category",
        };

        protected XManagementContext Db { get; private set; }
        protected DbSet<Product> Set { get; private set; }
        public ProductService(XManagementContext db)
        {
            Db = db;
            Set = Db.Set<Product>();
        }

        public virtual void Dispose()
        {
            if (Db != null)
            {
                Db.Dispose();
                Db = null;
            }
        }

        public async Task<IList<Product>> GetProducts()
        {
            IQueryable<Product> query = Set.AsNoTracking();

            // add default include
            foreach (var include in DefaultIncludes)
            {
                query = query.Include(include);
            }

            return await query.ToListAsync();
        }

        public async Task<Product> GetProduct(int id)
        {
            IQueryable<Product> query = Set.AsNoTracking();
            query = query.Where(p => p.ProductId == id);

            // add default include
            foreach (var include in DefaultIncludes)
            {
                query = query.Include(include);
            }

            // add some more and deeper
            query = query
                .Include(p => p.Stocks)
                    .ThenInclude(s => s.Store)
                .Include(p => p.OrderItems)
                    .ThenInclude(o => o.Order);

            return await query.FirstOrDefaultAsync();
        }
    }
}
