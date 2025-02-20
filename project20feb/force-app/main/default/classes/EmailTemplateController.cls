public with sharing class EmailTemplateController {
    @AuraEnabled(cacheable=true)
    public static List<EmailTemplate> getEmailTemplates(String relatedEntityType) {
        // Query email templates where the RelatedEntityType field matches the provided value
        return [
            SELECT Id, Name, DeveloperName, FolderName, TemplateType, Subject, Body, RelatedEntityType 
            FROM EmailTemplate 
            WHERE RelatedEntityType = :relatedEntityType
        ];
    }
}