using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Options
{
    public class FileStorageOptions
    {
        public string WebRootPath { get; set; } = string.Empty;
        public string ItemImagesPath { get; set; } = string.Empty;
        public string MenuLogosPath { get; set; } = string.Empty;
    }
}
