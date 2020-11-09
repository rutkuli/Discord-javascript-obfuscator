const {
    Discord,
    MessageAttachment
} = require('discord.js'); /*npm install discord.js*/
const Config = require('../config.json');
const download = require('download'); /*npm install download*/
const fs = require('fs'); /*npm install fs*/
const JavaScriptObfuscator = require('javascript-obfuscator'); /*npm install javascript-obfuscator*/

exports.run = async (client, message, args) => {

    const status = args[0]; /*Gets status from first argument*/

    if (!status) {
        /*If there is no status, this will send message.author a editable message*/
        message.delete();
        return message.channel.send(`$@{message.author.tag} Please specify status.`).then(s => {
            s.delete({
                timeout: 7000
            })
        })
    }

    if (status === "encode") {
        let method = args[1]; /*Gets method from second argument*/

        if (!method) {
            /*If there is no method, this will send message.author a editable message*/
            message.delete();
            return message.channel.send(`${message.author.tag} Please specify encryption level, *-low*, *medium*, *-high*`).then(s => {
                s.delete({
                    timeout: 7000
                })
            })
        }

        if (method === "-high") {
            try {
                Download(); /*Call function download*/
                function Download() {
                    const attachments = (message.attachments).array(); // Get list of attachments
                    const attachment = attachments[0]; // Take the first attachment
                    if (attachments.length !== 0) {
                        download(message.attachments.first().url, `./encoding/`, {
                            'filename': `${message.author.tag}.txt` /*Forces the file to be saved as txt file*/
                        });
                        setTimeout(function() {
                            Run();
                        }, 5000); /*Timeout 5000 = 5s*/ /*Call function Run after timeout*/
                        message.delete({
                            timeout: 10000
                        }); /*Deletes original attachment message*/ /*NOTICE: If your connection speed is slow, this might be a broplem. Higher number = slower deletion time which is great for bad internet connections*/
                    } else {
                        message.author.send('You should send the command with an file!');
                        message.delete();
                    }
                }

                function Run() {
                    fs.readFile(`./encoding/${message.author.tag}.txt`, 'utf8', function(err, data) {
                        if (err) {
                            return console.log(err);
                        }
                        var obfuscationResult = JavaScriptObfuscator.obfuscate(data, {
                            compact: true,
                            controlFlowFlattening: true,
                            controlFlowFlatteningThreshold: 1,
                            deadCodeInjection: true,
                            /*These options are editable, you can find the options from https://github.com/javascript-obfuscator/javascript-obfuscator*/
                            deadCodeInjectionThreshold: 25,
                            disableConsoleOutput: true,
                            renameGlobals: true,
                            selfDefending: true
                        });
                        fs.writeFile(`./encoding/finished/${message.author.tag}.txt`, obfuscationResult.getObfuscatedCode(), function(err) {
                            if (err) {
                                return console.log(err);
                            }
                        });
                    });
                    setTimeout(function() {
                        Send();
                    }, 7000); /*Timeout 7000 = 7s*/ /*Call function Send after timeout*/
                }

                function Send() {
                    fs.readFile(`./encoding/finished/${message.author.tag}.txt`, 'utf8', function(err, data) {
                        if (err) {
                            return console.log(err);
                        }
                        const Message = 'Your encrypted file.'; /*This is just an example text.*/
                        const attachment = new MessageAttachment(`./encoding/finished/${message.author.tag}.txt`);
                        message.author.send(Message, attachment);
                    });
                    setTimeout(function() {
                        Delete();
                    }, 10000); /*Timeout 10000 = 10s*/ /*Call function Delete after timeout*/
                }

                function Delete() {
                    fs.unlinkSync(`./encoding/${message.author.tag}.txt`); /*Deletes message.author original file*/
                    fs.unlinkSync(`./encoding/finished/${message.author.tag}.txt`); /*Deletes message.author encrypted file*/
                }

            } catch (err) {
                console.log(err);
            }
        }

        if (method === "-medium") {
            try {
                Download();

                function Download() {
                    const attachments = (message.attachments).array(); // Get list of attachments
                    const attachment = attachments[0]; // Take the first attachment
                    if (attachments.length !== 0) {
                        download(message.attachments.first().url, `./encoding/`, {
                            'filename': `${message.author.tag}.txt` /*Forces the file to be saved as txt file*/
                        });
                        setTimeout(function() {
                            Run();
                        }, 5000); /*Timeout 5000 = 5s*/ /*Call function Run after timeout*/
                        message.delete({
                            timeout: 10000
                        }); /*Deletes original attachment message*/ /*NOTICE: If your connection speed is slow, this might be a broplem. Higher number = slower deletion time which is great for bad internet connections*/
                    } else {
                        message.author.send('You should send the command with an file!');
                        message.delete();
                    }
                }

                function Run() {
                    fs.readFile(`./encoding/${message.author.tag}.txt`, 'utf8', function(err, data) {
                        if (err) {
                            return console.log(err);
                        }
                        var obfuscationResult = JavaScriptObfuscator.obfuscate(data, {
                            compact: true,
                            controlFlowFlattening: true,
                            controlFlowFlatteningThreshold: 0.75,
                            deadCodeInjection: true,
                            deadCodeInjectionThreshold: 0.4,
                            /*These options are editable, you can find the options from https://github.com/javascript-obfuscator/javascript-obfuscator*/
                            debugProtectionInterval: false,
                            disableConsoleOutput: true,
                            renameGlobals: false,
                            selfDefending: true,
                        });
                        fs.writeFile(`./encoding/finished/${message.author.tag}.txt`, obfuscationResult.getObfuscatedCode(), function(err) {
                            if (err) {
                                return console.log(err);
                            }
                        });
                    });
                    setTimeout(function() {
                        Send();
                    }, 7000); /*Timeout 7000 = 7s*/ /*Call function Send after timeout*/
                }

                function Send() {
                    fs.readFile(`./encoding/finished/${message.author.tag}.txt`, 'utf8', function(err, data) {
                        if (err) {
                            return console.log(err);
                        }
                        const Message = 'Your encrypted file.'; /*This is just an example text.*/
                        const attachment = new MessageAttachment(`./encoding/finished/${message.author.tag}.txt`);
                        message.author.send(Message, attachment);
                    });
                    setTimeout(function() {
                        Delete();
                    }, 10000); /*Timeout 10000 = 10s*/ /*Call function Delete after timeout*/
                }

                function Delete() {
                    fs.unlinkSync(`./encoding/${message.author.tag}.txt`); /*Deletes message.author original file*/
                    fs.unlinkSync(`./encoding/finished/${message.author.tag}.txt`); /*Deletes message.author encrypted file*/
                }

            } catch (err) {
                console.log(err);
            }
        }




        if (method === "-low") {
            try {
                Download();

                function Download() {
                    const attachments = (message.attachments).array(); // Get list of attachments
                    const attachment = attachments[0]; // Take the first attachment
                    if (attachments.length !== 0) {
                        download(message.attachments.first().url, `./encoding/`, {
                            'filename': `${message.author.tag}.txt` /*Forces the file to be saved as txt file*/
                        });
                        setTimeout(function() {
                            Run();
                        }, 5000); /*Timeout 5000 = 5s*/ /*Call function Run after timeout*/
                        message.delete({
                            timeout: 10000
                        }); /*Deletes original attachment message*/ /*NOTICE: If your connection speed is slow, this might be a broplem. Higher number = slower deletion time which is great for bad internet connections*/
                    } else {
                        message.author.send('You should send the command with an file!');
                        message.delete();
                    }
                }

                function Run() {
                    fs.readFile(`./encoding/${message.author.tag}.txt`, 'utf8', function(err, data) {
                        if (err) {
                            return console.log(err);
                        }
                        var obfuscationResult = JavaScriptObfuscator.obfuscate(data, {
                            compact: true,
                            mangle: true,
                            rotateStringArray: true,
                            selfDefending: true,
                            /*These options are editable, you can find the options from https://github.com/javascript-obfuscator/javascript-obfuscator*/
                            stringArray: true,
                        });
                        fs.writeFile(`./encoding/finished/${message.author.tag}.txt`, obfuscationResult.getObfuscatedCode(), function(err) {
                            if (err) {
                                return console.log(err);
                            }
                        });
                    });
                    setTimeout(function() {
                        Send();
                    }, 7000); /*Timeout 7000 = 7s*/ /*Call function Send after timeout*/
                }

                function Send() {
                    fs.readFile(`./encoding/finished/${message.author.tag}.txt`, 'utf8', function(err, data) {
                        if (err) {
                            return console.log(err);
                        }
                        const Message = 'Your encrypted file.'; /*This is just an example text.*/
                        const attachment = new MessageAttachment(`./encoding/finished/${message.author.tag}.txt`);
                        message.author.send(Message, attachment);
                    });
                    setTimeout(function() {
                        Delete();
                    }, 10000); /*Timeout 10000 = 10s*/ /*Call function Delete after timeout*/
                }

                function Delete() {
                    fs.unlinkSync(`./encoding/${message.author.tag}.txt`); /*Deletes message.author original file*/
                    fs.unlinkSync(`./encoding/finished/${message.author.tag}.txt`); /*Deletes message.author encrypted file*/
                }

            } catch (err) {
                console.log(err);
            }
        }
    }
}

exports.help = {
    name: 'obfuscator'
}
