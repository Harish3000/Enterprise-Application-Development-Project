using AutoMapper;
using webApi.DTOs;
using webApi.Models;

namespace webApi.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // Configure bidirectional mapping with ReverseMap
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<RegisterDto, User>().ReverseMap();
            CreateMap<Product, ProductDto>().ReverseMap();
            CreateMap<Vendor, VendorDto>().ReverseMap();
            CreateMap<Comment, CommentDto>().ReverseMap();
            CreateMap<Sale, SaleDto>().ReverseMap();
        }
    }
}
