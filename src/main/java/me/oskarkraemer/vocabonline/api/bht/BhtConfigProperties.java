package me.oskarkraemer.vocabonline.api.bht;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("bht")
public record BhtConfigProperties(String apiKey) { }