import * as vscode from 'vscode';
import * as fs from 'fs';
import { generalUtils } from './general';

interface workspaceResult {
    folders: vscode.Uri[],
    files: vscode.Uri[]
}

export class workspaceNavigation{
    /**
     * Returns all files and folders present on the user's workspace in an URI format
     * 
     * USAGE EXAMPLE: 
     * ``` let res = await getWorkspaceFilesAndFolders(); ```
     * @returns workspaceResult (folders AND files present on the user's workspace) | undefined.
     */
    static async getWorkspaceFilesAndFolders():Promise<workspaceResult | undefined>{
        try {
            const res = await workspaceNavigation.fetchRequestedDataFromWorkspace();
            if(res === undefined){
                return undefined;
            }else{
                return res;
            }
        } catch (error) {
            console.error("Error fetching workspace data:", error);
            return undefined;
        }
    }
    /**
     * Returns an array with URI links of all files present on the current workspace.
     * 
     * USAGE EXAMPLE: 
     * ``` let res = await getWorkspaceFiles(); ```
     * @returns vscodde.Uri[] | undefined
     */
    static  async getWorkspaceFiles():Promise<vscode.Uri[] | undefined>
    {    
        try {
            const res = await workspaceNavigation.fetchRequestedDataFromWorkspace();
            if (res === undefined) {
                return undefined;
            } else {
                return res.files;
            }
        } catch (error) {
            console.error("Error fetching workspace files:", error);
            return undefined;
        }
    }

    /**
     * Returns an array with URI links of all folders/directories present on the current workspace.
     * 
     * USAGE EXAMPLE: 
     * ``` let res = await getWorkspaceFolders(); ```
     * @returns vscodde.Uri[] | undefined
     */
    static async getWorkspaceFolders()
    {    
        try {
            const res = await workspaceNavigation.fetchRequestedDataFromWorkspace();
            if (res === undefined) {
                return undefined;
            } else {
                return res.folders;
            }
        } catch (error) {
            console.error("Error fetching workspace files:", error);
            return undefined;
        }
    }

    private static async fetchRequestedDataFromWorkspace():Promise<workspaceResult | undefined>{
        if(!vscode.workspace.workspaceFolders){
            generalUtils.showMessage("No workspace detected.", true);
            return undefined; 
        }

        var result:workspaceResult = {folders:[], files:[]};
    
        for(const folder of vscode.workspace.workspaceFolders){
            await this.recursiveGetFolders(folder.uri).then(res =>{
                result.folders.push(folder.uri);
                result.files = result.files.concat(res.files);
                result.folders = result.folders.concat(res.folders);
            });

        };
        return result;
    }

    private static async recursiveGetFolders(uri:vscode.Uri):Promise<workspaceResult>{
        var currentDirectory:[string,vscode.FileType][] = [];

        await vscode.workspace.fs.readDirectory(uri).then(result => currentDirectory = result);
        
        var returnDir:vscode.Uri[] = [];
        var returnFiles:vscode.Uri[] = [];
        for(const file of currentDirectory){
            var tempUri = vscode.Uri.parse(uri.toString()+"/"+file[0]);
            if(file[1] === vscode.FileType.Directory){
                returnDir.push(tempUri);
            }else if(file[1] === vscode.FileType.File){
                returnFiles.push(tempUri);
            }else if (file[1] === vscode.FileType.SymbolicLink){
                const target = fs.readlinkSync(tempUri.toString());
    
                const targetStat = fs.statSync(target);
                if (targetStat.isDirectory()) {
                    returnDir.push(tempUri);
                } else if (targetStat.isFile()) {
                    returnFiles.push(tempUri);
                } else {
                    console.error("Unknown file type for symbolic link target:", target);
                }
            }else{
                generalUtils.showMessage("Error! Couldn't read file " + file[0] + "!", true);
            }
        }

        var finalDirs = returnDir;
        for(const dir of returnDir){
            await workspaceNavigation.recursiveGetFolders(dir).then(res =>{
                finalDirs = finalDirs.concat(res.folders);
                returnFiles = returnFiles.concat(res.files);
                });
        }
        var finalResponse: workspaceResult = {folders: finalDirs, files: returnFiles};
        return finalResponse;
    }
   
    private static symLinkIsFile(path:vscode.Uri):boolean{
        var symLink = fs.statSync(path.toString());

        return symLink.isFile();
    }
}