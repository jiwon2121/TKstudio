package com.ssafy.gallery.common.stub;

import com.ssafy.pjt.grpc.CreateImageGrpc;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import lombok.Value;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;

import javax.annotation.PreDestroy;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

@Log4j2
@Component
public class GrpcStubPool {
    private final ManagedChannel channel;
    private final BlockingQueue<CreateImageGrpc.CreateImageBlockingStub> stubPool;
    private final String aiUrl = System.getenv("AI_URL");
//    private final String aiUrl = "localhost:9090";
    private final int poolSize = 1;
    public GrpcStubPool() {
        this.channel = ManagedChannelBuilder.forTarget(aiUrl).usePlaintext().build();
        this.stubPool = new ArrayBlockingQueue<>(poolSize);

        for (int i = 0; i < poolSize; i++) {
            CreateImageGrpc.CreateImageBlockingStub stub = CreateImageGrpc.newBlockingStub(channel);
            stubPool.offer(stub);
        }
        log.info("initial stub pool size is : "+ stubPool.size());
    }

    public CreateImageGrpc.CreateImageBlockingStub getStub() throws InterruptedException {
//        log.info("stub offer stub pool size is : "+ stubPool.size());
        return stubPool.take();
    }

    public void returnStub(CreateImageGrpc.CreateImageBlockingStub stub) throws InterruptedException {
        log.info("before return stub pool size is : "+ stubPool.size());
        stubPool.put(stub);
        log.info("stub return stub pool size is : "+ stubPool.size());
    }

    @PreDestroy
    public void close() {
        channel.shutdown();
    }
}