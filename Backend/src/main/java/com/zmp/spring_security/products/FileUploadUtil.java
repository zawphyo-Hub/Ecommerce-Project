package com.zmp.spring_security.products;

import org.springframework.web.multipart.MultipartFile;

import java.io.*;

public class FileUploadUtil {
    public static void saveFile(String uploadDir, String fileName, MultipartFile multipartFile) throws IOException {
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        try (InputStream inputStream = multipartFile.getInputStream()) {
            File file = new File(uploadDir + File.separator + fileName);
            try (OutputStream outputStream = new FileOutputStream(file)) {
                inputStream.transferTo(outputStream);
            }
        }
    }
}
