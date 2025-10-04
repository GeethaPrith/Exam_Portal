CREATE TABLE [dbo].[Roles] (
    [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [Name] NVARCHAR(50) NOT NULL UNIQUE,  -- Admin, Student, Teacher, etc.
    [IsActive] BIT NOT NULL DEFAULT 1,
    [IsDeleted] BIT NOT NULL DEFAULT 0,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

CREATE TABLE [dbo].[Users] (
    [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [FullName] NVARCHAR(100) NOT NULL,
    [Email] NVARCHAR(150) NOT NULL UNIQUE,
    [PasswordHash] NVARCHAR(MAX) NOT NULL,
    [RoleId] UNIQUEIDENTIFIER NOT NULL,  -- FK to Roles
    [IsActive] BIT NOT NULL DEFAULT 1,
    [IsDeleted] BIT NOT NULL DEFAULT 0,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),

    CONSTRAINT FK_Users_Roles FOREIGN KEY (RoleId) REFERENCES [dbo].[Roles](Id)
);


CREATE TABLE [dbo].[Students] (
    [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [FullName] NVARCHAR(100) NOT NULL,
    [Email] NVARCHAR(150) NOT NULL UNIQUE,
    [PasswordHash] NVARCHAR(MAX) NOT NULL,
    [MobileNumber] NVARCHAR(20),
    [IsActive] BIT NOT NULL DEFAULT 1,
    [IsDeleted] BIT NOT NULL DEFAULT 0,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);


CREATE TABLE [dbo].[Teachers] (
    [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [FullName] NVARCHAR(100) NOT NULL,
    [Email] NVARCHAR(150) NOT NULL UNIQUE,
    [PasswordHash] NVARCHAR(MAX) NOT NULL,
    [MobileNumber] NVARCHAR(20),
    [Specialization] NVARCHAR(200),
    [IsActive] BIT NOT NULL DEFAULT 1,
    [IsDeleted] BIT NOT NULL DEFAULT 0,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

INSERT INTO [dbo].[Roles] (Id, Name)
VALUES 
(NEWID(), 'Admin'),
(NEWID(), 'Manager');

CREATE TABLE [dbo].[SubscriptionPlans] (
    [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [Name] NVARCHAR(100) NOT NULL,
    [Amount] DECIMAL(10, 2) NOT NULL,
    [MaxQuestions] INT NOT NULL,
    [MaxMockTests] INT NOT NULL,
    [IsActive] BIT NOT NULL DEFAULT 1,
    [IsDeleted] BIT NOT NULL DEFAULT 0,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);


CREATE TABLE [dbo].[StudentSubscriptions] (
    [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [StudentId] UNIQUEIDENTIFIER NOT NULL,
    [SubscriptionPlanId] UNIQUEIDENTIFIER NOT NULL,
    [SubscribedOn] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [ExpiresOn] DATETIME2 NOT NULL,
    [IsActive] BIT NOT NULL DEFAULT 1,
    [IsDeleted] BIT NOT NULL DEFAULT 0,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),

    CONSTRAINT FK_StudentSubscriptions_Students 
        FOREIGN KEY (StudentId) REFERENCES [dbo].[Students](Id),
    CONSTRAINT FK_StudentSubscriptions_Plans 
        FOREIGN KEY (SubscriptionPlanId) REFERENCES [dbo].[SubscriptionPlans](Id)
);


CREATE TABLE [dbo].[TestCategories] (
    [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [Name] NVARCHAR(100) NOT NULL,
    [Description] NVARCHAR(500),
    [IsActive] BIT NOT NULL DEFAULT 1,
    [IsDeleted] BIT NOT NULL DEFAULT 0,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);


CREATE TABLE [dbo].[Questions] (
    [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [TestCategoryId] UNIQUEIDENTIFIER NOT NULL,
    [Title] NVARCHAR(300) NOT NULL,
    [Description] NVARCHAR(MAX),
    [ImageUrl] NVARCHAR(500),
    [AnswerType] NVARCHAR(20) NOT NULL, -- 'SingleSelect', 'MultiSelect', 'TextBox', 'TextArea'
    [IsActive] BIT NOT NULL DEFAULT 1,
    [IsDeleted] BIT NOT NULL DEFAULT 0,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),

    CONSTRAINT FK_Questions_TestCategories 
        FOREIGN KEY (TestCategoryId) REFERENCES [dbo].[TestCategories](Id)
);

CREATE TABLE [dbo].[QuestionOptions] (
    [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [QuestionId] UNIQUEIDENTIFIER NOT NULL,
    [Text] NVARCHAR(300) NOT NULL,
    [ImageUrl] NVARCHAR(500),
    [IsCorrect] BIT NOT NULL DEFAULT 0,  -- used for evaluation

    CONSTRAINT FK_QuestionOptions_Questions 
        FOREIGN KEY (QuestionId) REFERENCES [dbo].[Questions](Id)
);


CREATE TABLE [dbo].[StudentTestAttempts] (
    [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [StudentId] UNIQUEIDENTIFIER NOT NULL,
    [TestCategoryId] UNIQUEIDENTIFIER NOT NULL,
    [StartedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [CompletedAt] DATETIME2,
    [Score] DECIMAL(5,2),  -- Optional: if you auto-evaluate
    [IsActive] BIT NOT NULL DEFAULT 1,
    [IsDeleted] BIT NOT NULL DEFAULT 0,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),

    CONSTRAINT FK_Attempt_Student FOREIGN KEY (StudentId) REFERENCES [dbo].[Students](Id),
    CONSTRAINT FK_Attempt_Category FOREIGN KEY (TestCategoryId) REFERENCES [dbo].[TestCategories](Id)
);

CREATE TABLE [dbo].[StudentAnswers] (
    [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [StudentTestAttemptId] UNIQUEIDENTIFIER NOT NULL,
    [QuestionId] UNIQUEIDENTIFIER NOT NULL,
    [AnswerText] NVARCHAR(MAX), -- For TextBox/TextArea answers
    [IsCorrect] BIT,            -- Optional: set for auto-eval
    [IsActive] BIT NOT NULL DEFAULT 1,
    [IsDeleted] BIT NOT NULL DEFAULT 0,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),

    CONSTRAINT FK_Answers_Attempt FOREIGN KEY (StudentTestAttemptId) REFERENCES [dbo].[StudentTestAttempts](Id),
    CONSTRAINT FK_Answers_Question FOREIGN KEY (QuestionId) REFERENCES [dbo].[Questions](Id)
);


CREATE TABLE [dbo].[StudentAnswerOptions] (
    [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [StudentAnswerId] UNIQUEIDENTIFIER NOT NULL,
    [QuestionOptionId] UNIQUEIDENTIFIER NOT NULL,

    CONSTRAINT FK_AnswerOptions_Answer FOREIGN KEY (StudentAnswerId) REFERENCES [dbo].[StudentAnswers](Id),
    CONSTRAINT FK_AnswerOptions_Option FOREIGN KEY (QuestionOptionId) REFERENCES [dbo].[QuestionOptions](Id)
);




CREATE TABLE [dbo].[Attachments] (
    [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [EntityType] NVARCHAR(50) NOT NULL,      -- e.g., 'Question', 'User', 'TestCategory'
    [EntityId] UNIQUEIDENTIFIER NOT NULL,    -- ID of the linked entity
    [FileUrl] NVARCHAR(500) NOT NULL,        -- Full URL or path
    [FileName] NVARCHAR(255),
    [MimeType] NVARCHAR(100),                -- e.g., image/png, application/pdf
    [Description] NVARCHAR(500),
    [IsActive] BIT NOT NULL DEFAULT 1,
    [IsDeleted] BIT NOT NULL DEFAULT 0,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);
