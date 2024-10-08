using AutoMapper;
using webApi.DTOs;
using webApi.Models;

namespace webApi.Helpers
{
    // AutoMapper configuration for mapping between models and DTOs
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // Configure bidirectional mapping with ReverseMap

            // Mapping between User model and UserDto
            CreateMap<User, UserDto>().ReverseMap();

            // Mapping between RegisterDto and User model
            CreateMap<RegisterDto, User>().ReverseMap();

            // Mapping between Product model and ProductDto
            CreateMap<Product, ProductDto>().ReverseMap();

            // Mapping between Vendor model and VendorDto
            CreateMap<Vendor, VendorDto>().ReverseMap();

            // Mapping between Comment model and CommentDto
            CreateMap<Comment, CommentDto>().ReverseMap();

            // Mapping between Sale model and SaleDto
            CreateMap<Sale, SaleDto>().ReverseMap();
        }
    }
}
