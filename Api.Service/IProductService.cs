using Api.Data.Entity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Api.Service
{
    public interface IProductService
    {
        Task<IList<Product>> GetProducts();
        Task<Product> GetProduct(int id);
    }
}
