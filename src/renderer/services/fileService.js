import { promises as fs } from 'fs';

class FileService {
    // Create a new JSON file
    static async createNewFile (filePath, content) {
        try {
            await fs.writeFile(filePath, JSON.stringify(content, null, 2));
        } catch (error) {
            console.error('Error creating new file:', error);
            // Notify the user about the error
        }
    }

    // Open an existing JSON file
    static async openFile (filePath) {
        try {
            const fileContents = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(fileContents);
        } catch (error) {
            console.error('Error opening file:', error);
            // Notify the user about the error
            return null;
        }
    }

    // Save changes to JSON file
    static async saveFile (filePath, content) {
        try {
            await fs.writeFile(filePath, JSON.stringify(content, null, 2));
        } catch (error) {
            console.error('Error saving file:', error);
            // Notify the user about the error
        }
    }

    // Close the JSON file
    static closeFile () {
        // In Electron, there's no need to manually close files after reading/writing
    }
}

export default FileService;