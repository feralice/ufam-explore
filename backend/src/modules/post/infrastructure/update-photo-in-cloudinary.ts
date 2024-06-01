import { CloudinaryService } from "@adapters/cloudinary/cloudinary.service";

export const uploadFileToCloudinary = async (
   cloudinaryService: CloudinaryService,
   file?: Express.Multer.File,
 ): Promise<string> => {
   if (!file) {
     console.error('No file provided');
     return '';
   }
   try {
     const { url } = await cloudinaryService.uploadFile(file);
     return url;
   } catch (error) {
     throw new Error('Error uploading file to Cloudinary');
   }
 };
 