const CREATE_DATABASE = `CREATE DATABASE IF NOT EXISTS proj421`;

const CREATE_TABLES = {
    users: `
        CREATE TABLE IF NOT EXISTS Users (
            UserID INT PRIMARY KEY AUTO_INCREMENT,
            Username VARCHAR(50) UNIQUE NOT NULL,
            Password VARCHAR(255) NOT NULL,
            Email VARCHAR(100) UNIQUE NOT NULL,
            CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CHECK (LENGTH(Username) >= 3),
            CHECK (LENGTH(Password) >= 8)
        )
    `,
    posts: `
        CREATE TABLE IF NOT EXISTS Posts (
            PostID INT PRIMARY KEY AUTO_INCREMENT,
            UserID INT NOT NULL,
            Content TEXT NOT NULL,
            CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CHECK (LENGTH(Content) > 0),
            CHECK (LENGTH(Content) <= 500),
            FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
        )
    `,
    postMetrics: `
        CREATE TABLE IF NOT EXISTS PostMetrics (
            PostMetricID INT PRIMARY KEY AUTO_INCREMENT,
            PostID INT UNIQUE NOT NULL,
            LikeCount INT DEFAULT 0,
            ShareCount INT DEFAULT 0,
            LastUpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CHECK (LikeCount >= 0),
            CHECK (ShareCount >= 0),
            FOREIGN KEY (PostID) REFERENCES Posts(PostID) ON DELETE CASCADE
        )
    `,
    likes: `
        CREATE TABLE IF NOT EXISTS Likes (
            LikeID INT PRIMARY KEY AUTO_INCREMENT,
            PostID INT NOT NULL,
            UserID INT NOT NULL,
            CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE KEY unique_like (PostID, UserID),
            FOREIGN KEY (PostID) REFERENCES Posts(PostID) ON DELETE CASCADE,
            FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
        )
    `,
    shares: `
        CREATE TABLE IF NOT EXISTS Shares (
            ShareID INT PRIMARY KEY AUTO_INCREMENT,
            PostID INT NOT NULL,
            FromUserID INT NOT NULL,
            ToUserID INT NOT NULL,
            CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CHECK (FromUserID != ToUserID),
            FOREIGN KEY (PostID) REFERENCES Posts(PostID) ON DELETE CASCADE,
            FOREIGN KEY (FromUserID) REFERENCES Users(UserID) ON DELETE CASCADE,
            FOREIGN KEY (ToUserID) REFERENCES Users(UserID) ON DELETE CASCADE
        )
    `
};

module.exports = {
    CREATE_DATABASE,
    CREATE_TABLES
};